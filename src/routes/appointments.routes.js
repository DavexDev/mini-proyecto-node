import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';

import {
  createAppointment,
  getClientAppointments,
  updateAppointmentStatus,
  getVetAppointments
} from '../controllers/appointments.controller.js';

import { payAppointment } from '../services/payments.service.js';

const router = Router();

/**
 * CLIENT crea cita
 * POST /appointments
 */
router.post(
  '/',
  authenticateToken,
  createAppointment
);

/**
 * CLIENT ve sus citas
 * GET /appointments/me
 */
router.get(
  '/me',
  authenticateToken,
  getClientAppointments
);

/**
 * Cambiar estado de cita
 * PATCH /appointments/:id/status
 * CLIENT → cancelar
 * VET/ADMIN → confirmar, completar, no_show
 */
router.patch(
  '/:id/status',
  authenticateToken,
  updateAppointmentStatus
);

/**
 * VET ve su agenda
 * GET /appointments/vet/me?date=YYYY-MM-DD
 */
router.get(
  '/vet/me',
  authenticateToken,
  getVetAppointments
);

/**
 * Pago simulado con idempotencia
 * POST /appointments/:id/pay
 */
router.post(
  '/:id/pay',
  authenticateToken,
  payAppointment
);

export default router;
