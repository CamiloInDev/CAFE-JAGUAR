import { Router } from 'express';
import { dbService } from '../db';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', (_req, res) => {
  return res.json(dbService.getExperiences());
});

router.get('/:slug', (req, res) => {
  const exp = dbService.getExperienceBySlug(req.params.slug);
  if (!exp) return res.status(404).json({ error: 'Experiencia no encontrada.' });
  return res.json(exp);
});

router.post('/', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { nombre, descripcion, duracion_min, precio, capacidad_max, imagen_url, imagenes, booking_widget } = req.body;
    dbService.saveExperience({
      nombre,
      descripcion,
      duracion_min: Number(duracion_min),
      precio: Number(precio),
      capacidad_max: Number(capacidad_max),
      imagen_url,
      imagenes: imagenes || [],
      booking_widget: booking_widget || '<p>Default Booking Widget Embed</p>',
      activo: true
    });
    return res.status(201).json({ success: true, message: 'Experiencia creada.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    dbService.deleteExperience(req.params.id);
    return res.json({ success: true, message: 'Experiencia eliminada.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
