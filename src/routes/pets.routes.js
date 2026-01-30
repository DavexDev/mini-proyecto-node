import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import {
  createPet,
  getMyPets
} from '../controllers/pets.controller.js';

const router = Router();

// Cliente crea mascota
router.post(
  '/',
  authenticateToken,
  requireRole(['CLIENT']),
  createPet
);

// Cliente lista sus mascotas
router.get(
  '/',
  authenticateToken,
  requireRole(['CLIENT']),
  getMyPets
);

export default router;
