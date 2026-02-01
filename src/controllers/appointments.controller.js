import AppError from '../utils/AppError.js';

export let appointments = [];
let appointmentId = 1;

// ✅ Crear cita
export const createAppointment = (req, res, next) => {
  try {
    const { petId, vetId, serviceId, startTime, endTime } = req.body;

    if (!petId || !vetId || !serviceId || !startTime || !endTime) {
      throw new AppError('Missing required fields', 400, 'VALIDATION_ERROR');
    }

    const overlap = appointments.some(a =>
      a.vetId === vetId &&
      a.status !== 'CANCELLED' &&
      (
        new Date(startTime) < new Date(a.endTime) &&
        new Date(endTime) > new Date(a.startTime)
      )
    );

    if (overlap) {
      throw new AppError('Vet already booked for this time slot', 409, 'OVERLAP_ERROR');
    }

    const appointment = {
      id: appointmentId++,
      petId,
      vetId,
      serviceId,
      startTime,
      endTime,
      status: 'REQUESTED',
      clientId: req.user.id,
      createdAt: new Date()
    };

    appointments.push(appointment);
    res.status(201).json(appointment);

  } catch (err) {
    next(err);
  }
};

// ✅ Cliente ve sus citas
export const getClientAppointments = (req, res) => {
  const myAppointments = appointments.filter(
    a => a.clientId === req.user.id
  );
  res.json(myAppointments);
};

// ✅ Cambiar estado
export const updateAppointmentStatus = (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = appointments.find(a => a.id === Number(id));
    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'NOT_FOUND');
    }

    if (req.user.role === 'CLIENT' && status !== 'CANCELLED') {
      throw new AppError('Not allowed', 403, 'FORBIDDEN');
    }

    appointment.status = status;
    res.json(appointment);

  } catch (err) {
    next(err);
  }
};

// ✅ Agenda del vet
export const getVetAppointments = (req, res) => {
  if (req.user.role !== 'VET') {
    return res.status(403).json({
      error: 'FORBIDDEN',
      message: 'Only vets allowed'
    });
  }

  const { date } = req.query;

  const vetAppointments = appointments.filter(a =>
    a.vetId === req.user.id &&
    (!date || a.startTime.startsWith(date))
  );

  res.json(vetAppointments);
};
