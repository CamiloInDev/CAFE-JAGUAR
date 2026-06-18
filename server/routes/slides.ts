import { Router } from 'express';
import { dbService } from '../db';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const slides = dbService.getSlides();
    return res.json(slides || []);
  } catch (err: any) {
    console.error('[API /slides GET]', err);
    return res.json([]);
  }
});

router.get('/all', authenticateToken, requireAdmin, (_req, res) => {
  try {
    const slides = dbService.getAllSlides();
    return res.json(slides || []);
  } catch (err: any) {
    console.error('[API /slides/all GET]', err);
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const slide = dbService.getSlideById(req.params.id);
    if (!slide) return res.status(404).json({ error: 'Slide no encontrado.' });
    return res.json(slide);
  } catch (err: any) {
    console.error('[API /slides/:id GET]', err);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticateToken, requireAdmin, (req, res) => {
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
    return res.status(201).json({ success: true, message: 'Slide creado exitosamente.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
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
    return res.json({ success: true, message: 'Slide actualizado exitosamente.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    dbService.deleteSlide(req.params.id);
    return res.json({ success: true, message: 'Slide eliminado.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
