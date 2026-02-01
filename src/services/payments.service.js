// src/services/payments.service.js
import { appointments } from '../controllers/appointments.controller.js';
import AppError from '../utils/AppError.js';

const processedPayments = new Set(); // idempotencia en memoria

export const payAppointment = (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentId } = req.body;

    if (!paymentId) {
      throw new AppError('paymentId is required', 400, 'VALIDATION_ERROR');
    }

    // Idempotencia
    if (processedPayments.has(paymentId)) {
      return res.json({
        message: 'Payment already processed (idempotent)',
        paymentId
      });
    }

    const appointment = appointments.find(a => a.id === Number(id));

    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'NOT_FOUND');
    }

    if (appointment.status !== 'COMPLETED') {
      throw new AppError(
        'Only COMPLETED appointments can be paid',
        400,
        'INVALID_STATE'
      );
    }

    processedPayments.add(paymentId);

    res.json({
      message: 'Payment processed successfully',
      appointmentId: appointment.id,
      paymentId
    });

  } catch (err) {
    next(err);
  }
};
