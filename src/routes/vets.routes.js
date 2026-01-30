import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  getVets,
  getVetAvailability
} from '../controllers/vets.controller.js';

const router = Router();

// Listar veterinarios
router.get(
  '/',
  authenticateToken,
  getVets
);

// Disponibilidad por fecha
router.get(
  '/:id/availability',
  authenticateToken,
  getVetAvailability
);

export default router;
