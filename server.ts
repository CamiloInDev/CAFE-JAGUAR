import express from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import { dbService, hashPassword } from './server/db';
import * as crypto from 'crypto';
import { OrderStatus, ShippingAddress } from './src/types';

const PORT = 3000;

// Global error handlers to catch ALL crashes
process.on('uncaughtException', (err) => {
  console.log(`[UNCAUGHT EXCEPTION] ${err.message}`);
  console.log(`[STACK] ${err.stack}`);
console.log('[SERVER] Restarting in 2 seconds...');
  setTimeout(() => process.exit(1), 2000);
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(`[UNHANDLED REJECTION] ${reason}`);
  console.log('[SERVER] Restarting in 2 seconds...');
  setTimeout(() => process.exit(1), 2000);
});

const app = express();

// Log only API requests (not Vite internal requests)
app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});
const JWT_SECRET = process.env.JWT_SECRET || 'jaguar_secret_key_987654';
const WOMPI_INTEGRITY_KEY = process.env.WOMPI_INTEGRITY_KEY || 'integridad_sandbox_key_123';
const WOMPI_PUBLIC_KEY = process.env.VITE_WOMPI_PUBLIC_KEY || 'pub_test_wompi_sandbox_public_key';

// Middleware config
app.use(express.json());
app.use(cookieParser());

// Global error handler to prevent server crashes
app.use((err: any, req: any, res: any, next: any) => {
  console.log(`[FATAL ERROR] ${err.stack || err}`);
  res.status(500).json({ error: 'Error interno del servidor. Intente de nuevo.' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth helper middleware
function authenticateToken(req: any, res: any, next: any) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: 'Inicie sesión para continuar.' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      res.clearCookie('token');
      return res.status(403).json({ error: 'Su sesión ha expirado.' });
    }
    req.user = decoded;
    next();
  });
}

function requireAdmin(req: any, res: any, next: any) {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
}

// ----------------------------------------------------
// AUTH ENDPOINTS
// ----------------------------------------------------

app.post('/api/auth/registro', (req, res) => {
  try {
    const { email, password, nombre, apellido, telefono } = req.body;
    if (!email || !password || !nombre || !apellido) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser diligenciados.' });
    }

    const existingUser = dbService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya se encuentra registrado.' });
    }

    const passHash = hashPassword(password);
    const user = dbService.createUser({
      email,
      password_hash: passHash,
      nombre,
      apellido,
      telefono,
      rol: 'cliente'
    });

    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Diligencie el correo y la contraseña.' });
    }

    // Check for account lockout
    const lockStatus = dbService.checkLoginAttempt(email);
    if (lockStatus.blocked) {
      console.log(`[SECURITY] Blocked login attempt for ${email} - locked for ${lockStatus.lockoutRemaining} more minutes`);
      return res.status(429).json({ 
        error: `Demasiados intentos fallidos. Cuenta bloqueada por ${lockStatus.lockoutRemaining} minutos.` 
      });
    }

    const user = dbService.getUserByEmail(email);
    if (!user) {
      const remaining = dbService.recordFailedLogin(email);
      console.log(`[SECURITY] Failed login attempt for ${email} - ${remaining} attempts remaining`);
      return res.status(400).json({ 
        error: 'Credenciales inválidas. Verifique sus datos.',
        remainingAttempts: remaining
      });
    }

    const inputHash = hashPassword(password);
    if (user.password_hash !== inputHash) {
      const remaining = dbService.recordFailedLogin(email);
      console.log(`[SECURITY] Failed login for ${email} - ${remaining} attempts remaining`);
      return res.status(400).json({ 
        error: 'Credenciales inválidas. Verifique sus datos.',
        remainingAttempts: remaining
      });
    }

    // Success - clear failed attempts
    dbService.clearLoginAttempts(email);
    console.log(`[SECURITY] Successful login for ${email}`);

    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const { password_hash, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Sesión cerrada exitosamente.' });
});

app.get('/api/auth/me', authenticateToken, (req: any, res) => {
  try {
    const safeUser = dbService.getUserById(req.user.id);
    if (!safeUser) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json({ user: safeUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/auth/perfil', authenticateToken, (req: any, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Nombre y apellido son requeridos.' });
    }
    const updated = dbService.updateUserProfile(req.user.id, { nombre, apellido, telefono });
    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json({ user: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/recuperar', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Ingrese un correo electrónico.' });
  }
  const user = dbService.getUserByEmail(email);
  if (!user) {
    // Avoid user enumeration
    return res.json({ success: true, message: 'Si el correo existe, recibirá instrucciones para restablecer su clave.' });
  }
  // Mock reset link
  console.log(`[PASS_RESET] Mock password recovery link sent for ${email}. Reset code: RST-${Date.now()}`);
  res.json({ success: true, message: 'Correo enviado. (Consulte los logs de la consola o use clave de prueba; este paso se ha simulado exitosamente en este ambiente).' });
});

// ----------------------------------------------------
// PRODUCTS ENDPOINTS (Tienda)
// ----------------------------------------------------

app.get('/api/productos', (req, res) => {
  try {
    let products = dbService.getProducts();
    console.log(`GET /api/productos - returning ${products.length} products`);
    const { categoria, q } = req.query;

    if (categoria && categoria !== 'todos') {
      products = products.filter(p => p.categoria === categoria);
    }
    if (q) {
      const search = (q as string).toLowerCase();
      products = products.filter(p => 
        p.nombre.toLowerCase().includes(search) || 
        p.descripcion.toLowerCase().includes(search) ||
        p.origen.toLowerCase().includes(search)
      );
    }
    res.json(products);
  } catch (err: any) {
    console.log(`ERROR /api/productos: ${err}`);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/productos/:slug', (req, res) => {
  try {
    const prod = dbService.getProductBySlug(req.params.slug);
    if (!prod) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json(prod);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/productos', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { nombre, descripcion, precio, precio_antes, stock, categoria, origen, tueste, imagen_url, activo } = req.body;
    if (!nombre || !descripcion || precio === undefined || stock === undefined || !categoria || !origen || !tueste || !imagen_url) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    dbService.saveProduct({
      nombre,
      descripcion,
      precio: Number(precio),
      precio_antes: precio_antes ? Number(precio_antes) : undefined,
      stock: Number(stock),
      categoria,
      origen,
      tueste,
      imagen_url,
      activo: activo !== undefined ? activo : true
    });
    res.status(201).json({ success: true, message: 'Producto creado exitosamente.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/productos/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, descripcion, precio, precio_antes, stock, categoria, origen, tueste, imagen_url, activo } = req.body;
    if (!nombre || !descripcion || precio === undefined || stock === undefined || !categoria || !origen || !tueste || !imagen_url) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    dbService.saveProduct({
      id,
      nombre,
      descripcion,
      precio: Number(precio),
      precio_antes: precio_antes ? Number(precio_antes) : undefined,
      stock: Number(stock),
      categoria,
      origen,
      tueste,
      imagen_url,
      activo: activo !== undefined ? activo : true
    });
    res.json({ success: true, message: 'Producto actualizado exitosamente.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/productos/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    dbService.deleteProduct(req.params.id);
    res.json({ success: true, message: 'Producto eliminado.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// EXPERIENCES ENDPOINTS
// ----------------------------------------------------

app.get('/api/experiencias', (req, res) => {
  res.json(dbService.getExperiences());
});

app.get('/api/experiencias/:slug', (req, res) => {
  const exp = dbService.getExperienceBySlug(req.params.slug);
  if (!exp) return res.status(404).json({ error: 'Experiencia no encontrada.' });
  res.json(exp);
});

app.post('/api/experiencias', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { nombre, descripcion, duracion_min, precio, capacidad_max, imagen_url, booking_widget } = req.body;
    dbService.saveExperience({
      nombre,
      descripcion,
      duracion_min: Number(duracion_min),
      precio: Number(precio),
      capacidad_max: Number(capacidad_max),
      imagen_url,
      booking_widget: booking_widget || '<p>Default Booking Widget Embed</p>',
      activo: true
    });
    res.status(201).json({ success: true, message: 'Experiencia creada.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/experiencias/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    dbService.deleteExperience(req.params.id);
    res.json({ success: true, message: 'Experiencia eliminada.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// HACIENDAS ENDPOINTS
// ----------------------------------------------------

app.get('/api/haciendas', (req, res) => {
  res.json(dbService.getHaciendas());
});

// ----------------------------------------------------
// CONTACT/MESSAGES ENDPOINTS
// ----------------------------------------------------

app.post('/api/contacto', (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;
    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Diligencie todos los campos de contacto.' });
    }
    const newMsg = dbService.saveContactMessage({ nombre, email, asunto, mensaje });
    res.json({ success: true, message: 'Mensaje recibido exitosamente. Pronto le contactaremos.', data: newMsg });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/contacto', authenticateToken, requireAdmin, (req, res) => {
  res.json(dbService.getContactMessages());
});

app.put('/api/contacto/:id/leer', authenticateToken, requireAdmin, (req, res) => {
  dbService.markMessageAsRead(req.params.id);
  res.json({ success: true });
});

// ----------------------------------------------------
// TRANSACTIONS / ORDERS / WOOMPI INTEGRATION
// ----------------------------------------------------

// Phase 3 & 8 Helper functions implemented exactly as requested:
function generateWompiSignature(reference: string, amountInCents: number, currency: string) {
  const concat = reference + amountInCents + currency + WOMPI_INTEGRITY_KEY;
  return crypto.createHash('sha256').update(concat).digest('hex');
}

// 1. Prepare payment signatures and acceptance credentials for WooMPI checkout widget
app.post('/api/ordenes/preparar-pago', authenticateToken, (req: any, res) => {
  try {
    const { total } = req.body;
    if (!total || isNaN(total)) {
      return res.status(400).json({ error: 'Monto total no válido.' });
    }

    const reference = `ORDER-${req.user.id}-${Date.now()}`;
    const amountInCents = Math.round(total * 100); // Wompi uses Colombian cents e.g. 100 * COP
    const currency = 'COP';
    const signature = generateWompiSignature(reference, amountInCents, currency);
    
    // Preset/mock acceptance token for staging popup
    const acceptanceToken = `acc_tok_presigned_sandbox_${Date.now().toString(36)}`;

    res.json({
      reference,
      signature,
      acceptanceToken,
      amount: amountInCents,
      currency,
      publicKey: WOMPI_PUBLIC_KEY
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Error preparando firma del pago.' });
  }
});

// 2. Client logs complete order context right after frontend processes with or mocks Wompi widget payload
app.post('/api/ordenes/checkout', authenticateToken, (req: any, res) => {
  try {
    const { reference, wompiTransactionId, items, total, direccion_envio, notas } = req.body;
    if (!reference || !items || !total || !direccion_envio) {
      return res.status(400).json({ error: 'Datos de facturación o productos insuficientes.' });
    }

    const newOrder = dbService.createOrder({
      id: reference,
      user_id: req.user.id,
      estado: 'pendiente', // Becomes APPROVED/pagado shortly via Webhook simulation
      total: Number(total),
      wompi_transaction_id: wompiTransactionId || `Wmp-${Date.now()}`,
      direccion_envio,
      notas: notas || '',
      items
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. User client orders
app.get('/api/ordenes', authenticateToken, (req: any, res) => {
  try {
    const orders = dbService.getUserOrders(req.user.id);
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Admin order index
app.get('/api/ordenes-todas', authenticateToken, requireAdmin, (req, res) => {
  try {
    res.json(dbService.getOrders());
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Admin updates order state (e.g. dispatched, cancelled)
app.put('/api/ordenes/:id/estado', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { estado } = req.body;
    if (!estado) {
      return res.status(400).json({ error: 'Debe ingresar un estado para la orden.' });
    }
    const updated = dbService.updateOrderState(req.params.id, estado as OrderStatus);
    if (!updated) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }
    res.json({ success: true, order: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Simulate WooMPI Webhook Trigger (Allows developers/users to prompt real-time approval directly from the UI!)
app.post('/api/webhooks/wompi-test-trigger', (req, res) => {
  try {
    const { transactionId, reference, status } = req.body;
    if (!reference || !status) {
      return res.status(400).json({ error: 'Parámetros inconsistentes para simulación.' });
    }

    const correctStatus: OrderStatus = status === 'APPROVED' ? 'pagado' : 'pendiente';
    const updated = dbService.updateOrderState(reference, correctStatus);
    if (!updated) {
      return res.status(404).json({ error: 'La orden con esa referencia no existe para actualizar.' });
    }

    res.json({ success: true, status: updated.estado, message: `Webhook de prueba recibido. Estado cambiado a: ${updated.estado}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// ----------------------------------------------------
// SLIDES / CAROUSEL ENDPOINTS
// ----------------------------------------------------

app.get('/api/slides', (req, res) => {
  try {
    const slides = dbService.getSlides();
    res.json(slides || []);
  } catch (err: any) {
    console.error('[API /slides GET]', err);
    res.json([]);
  }
});

app.get('/api/slides/all', authenticateToken, requireAdmin, (req, res) => {
  try {
    const slides = dbService.getAllSlides();
    res.json(slides || []);
  } catch (err: any) {
    console.error('[API /slides/all GET]', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/slides/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const slide = dbService.getSlideById(req.params.id);
    if (!slide) return res.status(404).json({ error: 'Slide no encontrado.' });
    res.json(slide);
  } catch (err: any) {
    console.error('[API /slides/:id GET]', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/slides', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { title, subtitle, badge, buttonText, buttonLink, button2Text, button2Link, bgImage, orden, activo } = req.body;
    if (!title || !subtitle || !badge || !buttonText || !buttonLink || !bgImage) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser diligenciados.' });
    }
    dbService.saveSlide({
      title,
      subtitle,
      badge,
      buttonText,
      buttonLink,
      button2Text: button2Text || null,
      button2Link: button2Link || null,
      bgImage,
      orden: orden || 1,
      activo: activo !== undefined ? activo : true
    });
    res.status(201).json({ success: true, message: 'Slide creado exitosamente.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/slides/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    console.log(`PUT /api/slides/${req.params.id} - body: ${JSON.stringify(req.body).substring(0, 200)}`);
    const { title, subtitle, badge, buttonText, buttonLink, button2Text, button2Link, bgImage, orden, activo } = req.body;
    if (!title || !subtitle || !badge || !buttonText || !buttonLink || !bgImage) {
      console.log('PUT /api/slides - validation failed');
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser diligenciados.' });
    }
    console.log('PUT /api/slides - calling dbService.saveSlide');
    dbService.saveSlide({
      id: req.params.id,
      title,
      subtitle,
      badge,
      buttonText,
      buttonLink,
      button2Text: button2Text || null,
      button2Link: button2Link || null,
      bgImage,
      orden: orden || 1,
      activo: activo !== undefined ? activo : true
    });
    res.json({ success: true, message: 'Slide actualizado exitosamente.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/slides/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    dbService.deleteSlide(req.params.id);
    res.json({ success: true, message: 'Slide eliminado.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// VITE CLIENT MIDDLEWARE AND SERVER INITIALIZER
// ----------------------------------------------------

async function start() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Starting Vite dev server...');
      // Development Mode
      const vite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: { overlay: false } // Disable HMR overlay to prevent crashes
        },
        appType: 'spa',
      });
      console.log('Vite server created successfully');
      app.use(vite.middlewares);
    } else {
      // Production Mode
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[JAGUAR-SERVER] Running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(`[STARTUP ERROR] ${err}`);
    process.exit(1);
  }
}

start();
