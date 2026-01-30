import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  createAppointment,
  getMyAppointments
} from '../controllers/appointments.controller.js';

const router = Router();

// Cliente solicita cita
router.post('/', authenticateToken, createAppointment);

// Cliente ve sus citas
router.get('/me', authenticateToken, getMyAppointments);

export default router;
