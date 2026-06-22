import { Router } from 'express';
import { dbService } from '../db';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public: create a reservation request
router.post('/', (req, res) => {
  try {
    const { tipo, item_id, item_nombre, item_slug, fecha, nombre, email, telefono, cantidad_personas, notas } = req.body;

    if (!tipo || !item_id || !item_nombre || !fecha || !nombre || !email || !telefono || !cantidad_personas) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    if (!['academia', 'estadia'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo de reserva no válido.' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Correo electrónico no válido.' });
    }

    // Validate date format YYYY-MM-DD and not in the past
    const selectedDate = new Date(fecha + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      return res.status(400).json({ error: 'La fecha seleccionada no es válida o ya pasó.' });
    }

    const reservation = dbService.createReservation({
      tipo,
      item_id,
      item_nombre,
      item_slug: item_slug || '',
      fecha,
      nombre,
      email,
      telefono,
      cantidad_personas: Number(cantidad_personas),
      notas: notas || ''
    });

    return res.status(201).json({ success: true, reservation });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Public: get occupied dates for a specific item
router.get('/ocupadas', (req, res) => {
  try {
    const { tipo, item_id } = req.query;
    if (!tipo || !item_id || typeof tipo !== 'string' || typeof item_id !== 'string') {
      return res.status(400).json({ error: 'tipo e item_id son requeridos.' });
    }
    if (!['academia', 'estadia'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo no válido.' });
    }
    const dates = dbService.getOccupiedDates(tipo as 'academia' | 'estadia', item_id);
    return res.json({ dates });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: list all reservations
router.get('/', authenticateToken, requireAdmin, (_req, res) => {
  try {
    return res.json(dbService.getReservations());
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: update reservation status
router.put('/:id/estado', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { estado } = req.body;
    if (!estado || !['pendiente', 'confirmada', 'cancelada'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido.' });
    }
    const updated = dbService.updateReservationState(req.params.id, estado);
    if (!updated) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }
    return res.json({ success: true, reservation: updated });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
