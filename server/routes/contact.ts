import { Router } from 'express';
import { dbService } from '../db';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;
    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Diligencie todos los campos de contacto.' });
    }
    const newMsg = dbService.saveContactMessage({ nombre, email, asunto, mensaje });
    return res.json({ success: true, message: 'Mensaje recibido exitosamente. Pronto le contactaremos.', data: newMsg });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/', authenticateToken, requireAdmin, (_req, res) => {
  return res.json(dbService.getContactMessages());
});

router.put('/:id/leer', authenticateToken, requireAdmin, (req, res) => {
  dbService.markMessageAsRead(req.params.id);
  return res.json({ success: true });
});

export default router;
