import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import {
  getServices,
  createService,
  deleteService
} from '../controllers/services.controller.js';

const router = Router();

// Ver servicios → cualquier usuario autenticado
router.get('/', authenticateToken, getServices);

// Crear servicio → solo ADMIN
router.post(
  '/',
  authenticateToken,
  requireRole(['ADMIN']),
  createService
);

// Eliminar servicio → solo ADMIN
router.delete(
  '/:id',
  authenticateToken,
  requireRole(['ADMIN']),
  deleteService
);

export default router;
