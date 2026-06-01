import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { Product, Experience, Hacienda, User, Order, ContactMessage, OrderStatus, OrderItem, CarouselSlide } from '../src/types';

const LOG_FILE = path.join(process.cwd(), 'logs', 'server.log');

function log(msg: string) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${msg}\n`;
  try {
    const dir = path.dirname(LOG_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(LOG_FILE, logLine);
  } catch {}
  console.log(logLine.trim());
}

// Password utility to avoid native bcrypt issues on sandbox
export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, 'jaguar_salt_123', 1000, 64, 'sha512').toString('hex');
}

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

interface LoginAttempt {
  email: string;
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

interface DatabaseSchema {
  users: Array<User & { password_hash: string }>;
  products: Product[];
  experiences: Experience[];
  haciendas: Hacienda[];
  orders: Order[];
  contactMessages: ContactMessage[];
  slides: CarouselSlide[];
  loginAttempts: Record<string, LoginAttempt>;
}

const INITIAL_DB: DatabaseSchema = {
  users: [
    {
      id: 'usr_admin',
      email: 'admin@jaguarcoffee.com',
      password_hash: hashPassword('admin123'),
      nombre: 'Administrador',
      apellido: 'Jaguar',
      telefono: '+573001234567',
      rol: 'admin',
      created_at: new Date().toISOString()
    },
    {
      id: 'usr_cliente',
      email: 'cliente@jaguarcoffee.com',
      password_hash: hashPassword('cliente123'),
      nombre: 'Mateo',
      apellido: 'Gómez',
      telefono: '+573159876543',
      rol: 'cliente',
      created_at: new Date().toISOString()
    }
  ],
  products: [
    {
      id: 'prod_1',
      slug: 'jaguar-reserva-bourbon',
      nombre: 'Jaguar Reserva Bourbon Rosado',
      descripcion: 'Edición limitada cosechada a más de 1,900 msnm en el corazón del Huila. Este café presenta notas florales intensas, aroma a jazmín y un dulce perfil frutal que asemeja frutos rojos y durazno, complementado con una acidez brillante y jugosa de uva blanca.',
      precio: 48000,
      precio_antes: 55000,
      stock: 45,
      categoria: 'grano',
      origen: 'Huila (Pitalito)',
      tueste: 'Medio',
      imagen_url: 'https://images.unsplash.com/photo-1559056191-4819004e3827?auto=format&fit=crop&q=80&w=600',
      activo: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'prod_2',
      slug: 'sierra-nevada-organic',
      nombre: 'Sierra Nevada Orgánico',
      descripcion: 'Cultivado bajo sombra nativa por comunidades indígenas de la Sierra Nevada de Santa Marta. Posee un perfil robusto y equilibrado, destacando por su cuerpo denso, baja acidez y notas rústicas a chocolate negro, nueces tostadas y un sutil regusto a panela artesanal.',
      precio: 36000,
      precio_antes: 39000,
      stock: 60,
      categoria: 'grano',
      origen: 'Sierra Nevada de Santa Marta',
      tueste: 'Medio-Oscuro',
      imagen_url: 'https://images.unsplash.com/photo-1580933181604-7fa417bd74e8?auto=format&fit=crop&q=80&w=600',
      activo: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'prod_3',
      slug: 'geisha-especial',
      nombre: 'Variedad Geisha Especial',
      descripcion: 'Uno de los varietales más codiciados del mundo, cultivado en la región del Quindío. Su taza es sumamente limpia y delicada, con un bouquet perfumado de notas cítricas como limoncillo, té de jazmín, miel de abejas silvestre y un retrogusto sedoso y prolongado.',
      precio: 85000,
      stock: 12,
      categoria: 'molido',
      origen: 'Quindío (Genoa)',
      tueste: 'Ligero',
      imagen_url: 'https://images.unsplash.com/photo-1610632380989-6800249be455?auto=format&fit=crop&q=80&w=600',
      activo: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'prod_4',
      slug: 'capsulas-espresso-jaguar',
      nombre: 'Cápsulas Espresso Premium (x10)',
      descripcion: 'Compatible con sistema Nespresso. Nuestro café insignia de especialidad molido y sellado en cápsulas de aluminio 100% reciclables. Ofrece un café corto cremoso, de cuerpo redondo y notas intensas a cacao y caramelo quemado.',
      precio: 24000,
      precio_antes: 28000,
      stock: 120,
      categoria: 'capsulas',
      origen: 'Tolima',
      tueste: 'Oscuro',
      imagen_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
      activo: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'prod_5',
      slug: 'kit-barista-inicial',
      nombre: 'Kit Barista Profesional Inicial',
      descripcion: 'Todo lo que necesitas para comenzar tu viaje en el café de especialidad. Incluye: 1 Cafetera de Prensa Francesa de émbolo en acero inoxidable y vidrio borosilicatado (600ml), y 1 bolsa de Café Jaguar Bourbon Rosado de 340g molido en el punto óptimo.',
      precio: 110000,
      precio_antes: 130000,
      stock: 25,
      categoria: 'kit',
      origen: 'Accesorios / Huila',
      tueste: 'Variado',
      imagen_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
      activo: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'prod_6',
      slug: 'taza-ceramica-artesanal',
      nombre: 'Taza de Cerámica Jaguar Negra',
      descripcion: 'Taza de gres cerámico modelada a mano por artesanos locales en Colombia. Acabado en esmalte mate negro con sutiles toques cobrizos, capacidad perfecta de 8oz para cappuccinos, lattes o café filtrado. Excelente retención del calor.',
      precio: 29000,
      stock: 80,
      categoria: 'accesorio',
      origen: 'Artesanal Raquira',
      tueste: 'N/A',
      imagen_url: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&q=80&w=600',
      activo: true,
      created_at: new Date().toISOString()
    }
  ],
  experiences: [
    {
      id: 'exp_1',
      slug: 'cata-sensorial-jaguar',
      nombre: 'Cata Sensorial Jaguar de Especialidad',
      descripcion: 'Sumérgete en el cautivador mundo de los aromas del café colombianos. En esta cata guiada por nuestros baristas autorizados aprenderás a identificar descriptores, fragancias, acidez, cuerpo y dulzor de 4 varietales exclusivos de Jaguar Coffee.',
      duracion_min: 120,
      precio: 85000,
      capacidad_max: 10,
      imagen_url: 'https://images.unsplash.com/photo-1541170155377-5091f3b2b044?auto=format&fit=crop&q=80&w=600',
      activo: true,
      booking_widget: `<div class="p-6 bg-amber-50 border border-amber-200 rounded-xl max-w-md mx-auto text-center" id="booking-widget-mock">
        <h4 class="text-lg font-bold text-amber-900 mb-2 font-display">Reserva tu Experiencia vía Booking.com Alianzas</h4>
        <p class="text-sm text-amber-800 mb-4 font-sans">Estás a punto de reservar esta actividad a través de nuestro operador autorizado en Booking.com.</p>
        <div class="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-amber-700 transition" onclick="alert('Redirigiendo al widget seguro de Booking.com para reservar la Cata Sensorial...')">
          Reservar en Booking.com
        </div>
      </div>`
    },
    {
      id: 'exp_2',
      slug: 'taller-barismo-profesional',
      nombre: 'Taller Práctico de Barismo y Arte Latte',
      descripcion: 'Aprende los secretos detrás de la extracción perfecta del espresso y la textura sedosa de la leche. Este taller práctico en nuestra máquina italiana te dará las bases para elaborar lattes de concurso, cappuccinos perfectos y hermosos lattes art.',
      duracion_min: 180,
      precio: 140000,
      capacidad_max: 4,
      imagen_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600',
      activo: true,
      booking_widget: `<div class="p-6 bg-amber-50 border border-amber-200 rounded-xl max-w-md mx-auto text-center" id="booking-widget-mock">
        <h4 class="text-lg font-bold text-amber-900 mb-2 font-display">Reserva de Taller Barista en Booking.com Experiences</h4>
        <p class="text-sm text-amber-800 mb-4 font-sans">Administrado y garantizado por las experiencias oficiales de Booking de Jaguar Coffee.</p>
        <div class="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-amber-700 transition" onclick="alert('Redirigiendo al widget seguro de Booking.com para reservar el Taller Práctico...')">
          Reservar en Booking.com
        </div>
      </div>`
    }
  ],
  haciendas: [
    {
      id: 'hac_1',
      nombre: 'Hacienda El Jaguar Real',
      descripcion: 'Una majestuosa casona cafetera del siglo XIX ubicada en Venecia, Antioquia. Rodeada de exuberante vegetación y senderos con avistamiento de aves, ofrece caminatas guiadas por los cafetales ecológicos, piscinas naturales, cabalgatas y confortables habitaciones con terraza colonial con vista a los Farallones del Citará.',
      ubicacion: 'Venecia, Antioquia - Km 4 vía Bolombolo',
      imagen_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
      airbnb_url: 'https://airbnb.com/rooms/mock-jaguar-real',
      booking_url: 'https://booking.com/hotel/co/hacienda-el-jaguar-real.html'
    },
    {
      id: 'hac_2',
      nombre: 'Finca Cafetera Vista Hermosa',
      descripcion: 'Ubicada sobre el cañón del río Cauca en Jericó, Antioquia, esta espectacular y moderna cabaña rústica te permite despertar flotando sobre un mar de nubes. El hospedaje incluye una inmersión completa de cosecha en canasto artesanal, molienda a pedal y degustación en fogata campesina.',
      ubicacion: 'Jericó, Antioquia - Vereda La Soledad',
      imagen_url: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=600',
      airbnb_url: 'https://airbnb.com/rooms/mock-vista-hermosa',
      booking_url: 'https://booking.com/hotel/co/finca-vista-hermosa-jerico.html'
    }
],
  orders: [],
  contactMessages: [],
  slides: [],
  loginAttempts: {}
};

// Initialize file database if it doesn't exist
function initDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
  }
}

initDb();

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);
    if (!data.slides) {
      data.slides = [];
      writeDb(data);
    }
    return data;
  } catch (err) {
    log(`ERROR readDb: ${err}`);
    initDb();
    return { ...INITIAL_DB, slides: [] };
  }
}

function writeDb(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing JSON DB', err);
  }
}

export const dbService = {
  // Users
  getUsers(): User[] {
    const data = readDb();
    return data.users.map(({ password_hash, ...u }) => u);
  },
  
  getUserByEmail(email: string) {
    const data = readDb();
    const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  },

  getUserById(id: string) {
    const data = readDb();
    const user = data.users.find(u => u.id === id);
    if (!user) return null;
    const { password_hash, ...safeUser } = user;
    return safeUser;
  },

  createUser(user: { email: string; password_hash: string; nombre: string; apellido: string; telefono?: string; rol?: 'cliente' | 'admin' }) {
    const data = readDb();
    const newUser: DatabaseSchema['users'][0] = {
      id: 'usr_' + Date.now().toString(36),
      email: user.email,
      password_hash: user.password_hash,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono || '',
      rol: user.rol || 'cliente',
      created_at: new Date().toISOString()
    };
    data.users.push(newUser);
    writeDb(data);
    const { password_hash, ...safeUser } = newUser;
    return safeUser;
  },

  updateUserProfile(userId: string, updates: { nombre: string; apellido: string; telefono?: string }) {
    const data = readDb();
    const userIdx = data.users.findIndex(u => u.id === userId);
    if (userIdx === -1) return null;
    
    data.users[userIdx] = {
      ...data.users[userIdx],
      nombre: updates.nombre,
      apellido: updates.apellido,
      telefono: updates.telefono || ''
    };
    
    writeDb(data);
    const { password_hash, ...safeUser } = data.users[userIdx];
    return safeUser;
  },

  // Products
  getProducts(): Product[] {
    return readDb().products;
  },

  getProductBySlug(slug: string): Product | null {
    const p = readDb().products.find(x => x.slug === slug);
    return (p && p.activo) ? p : null;
  },

  getProductById(id: string): Product | null {
    return readDb().products.find(x => x.id === id) || null;
  },

  saveProduct(prod: Omit<Product, 'id' | 'created_at' | 'slug'> & { id?: string }) {
    const data = readDb();
    if (prod.id) {
      // Edit
      const idx = data.products.findIndex(x => x.id === prod.id);
      if (idx !== -1) {
        data.products[idx] = {
          ...data.products[idx],
          ...prod,
          slug: prod.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        } as Product;
      }
    } else {
      // Create
      const newProd: Product = {
        ...prod,
        id: 'prod_' + Date.now().toString(36),
        slug: prod.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        activo: prod.activo !== undefined ? prod.activo : true,
        created_at: new Date().toISOString()
      };
      data.products.push(newProd);
    }
    writeDb(data);
  },

  deleteProduct(id: string) {
    const data = readDb();
    // Soft delete or hard delete
    data.products = data.products.filter(x => x.id !== id);
    writeDb(data);
  },

  // Experiences
  getExperiences(): Experience[] {
    return readDb().experiences;
  },

  getExperienceBySlug(slug: string): Experience | null {
    return readDb().experiences.find(x => x.slug === slug) || null;
  },

  saveExperience(exp: Omit<Experience, 'id' | 'slug'> & { id?: string }) {
    const data = readDb();
    if (exp.id) {
      const idx = data.experiences.findIndex(x => x.id === exp.id);
      if (idx !== -1) {
        data.experiences[idx] = {
          ...data.experiences[idx],
          ...exp,
          slug: exp.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        } as Experience;
      }
    } else {
      const newExp: Experience = {
        ...exp,
        id: 'exp_' + Date.now().toString(36),
        slug: exp.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        activo: exp.activo !== undefined ? exp.activo : true
      };
      data.experiences.push(newExp);
    }
    writeDb(data);
  },

  deleteExperience(id: string) {
    const data = readDb();
    data.experiences = data.experiences.filter(x => x.id !== id);
    writeDb(data);
  },

  // Haciendas
  getHaciendas(): Hacienda[] {
    return readDb().haciendas;
  },

  // Messages
  saveContactMessage(msg: Omit<ContactMessage, 'id' | 'created_at' | 'respondido'>) {
    const data = readDb();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg_' + Date.now().toString(36),
      respondido: false,
      created_at: new Date().toISOString()
    };
    data.contactMessages.push(newMsg);
    writeDb(data);
    return newMsg;
  },

  getContactMessages() {
    return readDb().contactMessages;
  },

  markMessageAsRead(id: string) {
    const data = readDb();
    const idx = data.contactMessages.findIndex(x => x.id === id);
    if (idx !== -1) {
      data.contactMessages[idx].respondido = true;
      writeDb(data);
    }
  },

  // Orders
  getOrders(): Order[] {
    const db = readDb();
    return db.orders.map(order => {
      const user = db.users.find(u => u.id === order.user_id);
      return {
        ...order,
        user_email: user?.email || 'N/A'
      };
    });
  },

  getUserOrders(userId: string): Order[] {
    return readDb().orders.filter(x => x.user_id === userId);
  },

  getOrderById(id: string): Order | null {
    const o = readDb().orders.find(x => x.id === id);
    return o || null;
  },

  createOrder(order: Omit<Order, 'id' | 'created_at' | 'estado'> & { id?: string, estado?: OrderStatus }) {
    const data = readDb();
    const newOrder: Order = {
      ...order,
      id: order.id || 'ORDER-' + Date.now().toString(),
      estado: order.estado || 'pendiente',
      created_at: new Date().toISOString()
    };
    data.orders.push(newOrder);

    // If order was fully paid, deduct stock!
    if (newOrder.estado === 'pagado') {
      this.deductProductStock(newOrder.items, data);
    }

    writeDb(data);
    return newOrder;
  },

  updateOrderState(id: string, estado: OrderStatus) {
    const data = readDb();
    const idx = data.orders.findIndex(x => x.id === id);
    if (idx !== -1) {
      const previousState = data.orders[idx].estado;
      data.orders[idx].estado = estado;
      
      // Stock deduction if transition became approved/paid
      if (estado === 'pagado' && previousState !== 'pagado') {
        this.deductProductStock(data.orders[idx].items, data);
      }
      
      writeDb(data);
      return data.orders[idx];
    }
    return null;
  },

  deductProductStock(items: OrderItem[], data: DatabaseSchema) {
    for (const item of items) {
      const prod = data.products.find(p => p.id === item.product_id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.cantidad);
      }
    }
  },

  // Slides / Carousel
  getSlides(): CarouselSlide[] {
    try {
      const data = readDb();
      if (!data.slides || !Array.isArray(data.slides)) {
        log('WARN: slides is not an array, returning empty');
        return [];
      }
      return data.slides
        .filter(s => s && s.activo === true)
        .sort((a, b) => (a.orden || 0) - (b.orden || 0));
    } catch (err) {
      log(`ERROR getSlides: ${err}`);
      return [];
    }
  },

  getAllSlides(): CarouselSlide[] {
    try {
      const data = readDb();
      if (!data.slides || !Array.isArray(data.slides)) {
        log('WARN: slides is not an array, returning empty');
        return [];
      }
      return data.slides
        .filter(s => s)
        .sort((a, b) => (a.orden || 0) - (b.orden || 0));
    } catch (err) {
      log(`ERROR getAllSlides: ${err}`);
      return [];
    }
  },

  getSlideById(id: string): CarouselSlide | null {
    return readDb().slides.find(s => s.id === id) || null;
  },

  saveSlide(slide: Omit<CarouselSlide, 'id'> & { id?: string }) {
    try {
      const data = readDb();
      if (!data.slides) {
        data.slides = [];
      }
      
      if (slide.id) {
        const idx = data.slides.findIndex(s => s && s.id === slide.id);
        if (idx !== -1) {
          data.slides[idx] = { ...data.slides[idx], ...slide };
        } else {
          log(`WARN: Slide not found for update: ${slide.id}`);
        }
      } else {
        const newSlide: CarouselSlide = {
          title: slide.title || '',
          subtitle: slide.subtitle || '',
          badge: slide.badge || '',
          buttonText: slide.buttonText || '',
          buttonLink: slide.buttonLink || '/',
          button2Text: slide.button2Text || null,
          button2Link: slide.button2Link || null,
          bgImage: slide.bgImage || '',
          orden: slide.orden || data.slides.length + 1,
          activo: slide.activo !== undefined ? slide.activo : true,
          id: 'slide_' + Date.now().toString(36),
        };
        data.slides.push(newSlide);
      }
      writeDb(data);
    } catch (err) {
      log(`ERROR saveSlide: ${err}`);
      throw err;
    }
  },

  deleteSlide(id: string) {
    const data = readDb();
    data.slides = data.slides.filter(s => s.id !== id);
    writeDb(data);
  },

  // Security: Login attempts management
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15 minutes

  checkLoginAttempt(email: string): { blocked: boolean; remainingAttempts: number; lockoutRemaining?: number } {
    const data = readDb();
    const attempt = data.loginAttempts[email.toLowerCase()];
    
    if (!attempt) {
      return { blocked: false, remainingAttempts: this.MAX_LOGIN_ATTEMPTS };
    }

    // Check if currently locked out
    if (attempt.lockedUntil && attempt.lockedUntil > Date.now()) {
      const remaining = Math.ceil((attempt.lockedUntil - Date.now()) / 1000 / 60);
      return { blocked: true, remainingAttempts: 0, lockoutRemaining: remaining };
    }

    // Reset if lockout expired
    if (attempt.lockedUntil && attempt.lockedUntil <= Date.now()) {
      data.loginAttempts[email.toLowerCase()] = { email: email.toLowerCase(), count: 0, lastAttempt: Date.now() };
      writeDb(data);
      return { blocked: false, remainingAttempts: this.MAX_LOGIN_ATTEMPTS };
    }

    return { blocked: false, remainingAttempts: this.MAX_LOGIN_ATTEMPTS - attempt.count };
  },

  recordFailedLogin(email: string): number {
    const data = readDb();
    const key = email.toLowerCase();
    const attempt = data.loginAttempts[key];

    if (!attempt) {
      data.loginAttempts[key] = { email: key, count: 1, lastAttempt: Date.now() };
    } else {
      attempt.count += 1;
      attempt.lastAttempt = Date.now();

      // Lock out if max attempts reached
      if (attempt.count >= this.MAX_LOGIN_ATTEMPTS) {
        attempt.lockedUntil = Date.now() + this.LOCKOUT_DURATION_MS;
        console.log(`[SECURITY] Account locked for ${email} due to ${attempt.count} failed attempts`);
      }
    }

    writeDb(data);
    return this.MAX_LOGIN_ATTEMPTS - (attempt?.count || 1);
  },

  clearLoginAttempts(email: string) {
    const data = readDb();
    delete data.loginAttempts[email.toLowerCase()];
    writeDb(data);
  }
};
