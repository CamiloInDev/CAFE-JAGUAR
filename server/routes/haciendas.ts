import { Router } from 'express';
import { dbService } from '../db';

const router = Router();

router.get('/', (_req, res) => {
  return res.json(dbService.getHaciendas());
});

export default router;
