import { Router } from 'express';
import { dbService } from '../db';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', (req, res) => {
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
    return res.json(products);
  } catch (err: any) {
    console.log(`ERROR /api/productos: ${err}`);
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', (req, res) => {
  try {
    const prod = dbService.getProductBySlug(req.params.slug);
    if (!prod) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    return res.json(prod);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, requireAdmin, (req, res) => {
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
    return res.status(201).json({ success: true, message: 'Producto creado exitosamente.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
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
    return res.json({ success: true, message: 'Producto actualizado exitosamente.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    dbService.deleteProduct(req.params.id);
    return res.json({ success: true, message: 'Producto eliminado.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
