export let appointments = [];
let appointmentId = 1;

export const createAppointment = (req, res) => {
  const { petId, vetId, serviceId, startTime, endTime } = req.body;

  if (!petId || !vetId || !serviceId || !startTime || !endTime) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // 🚫 Evitar doble reserva
  const overlap = appointments.some(a =>
    a.vetId === vetId &&
    a.status !== 'CANCELLED' &&
    (
      new Date(startTime) < new Date(a.endTime) &&
      new Date(endTime) > new Date(a.startTime)
    )
  );

  if (overlap) {
    return res.status(409).json({
      message: 'Vet already booked for this time slot'
    });
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
};

export const getMyAppointments = (req, res) => {
  const myAppointments = appointments.filter(
    a => a.clientId === req.user.id
  );

  res.json(myAppointments);
};
export const updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const appointment = appointments.find(a => a.id === Number(id));
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  // CLIENTE solo puede cancelar
  if (req.user.role === 'CLIENT' && status !== 'CANCELLED') {
    return res.status(403).json({ message: 'Not allowed' });
  }

  appointment.status = status;
  res.json(appointment);
};

export const getVetAppointments = (req, res) => {
  if (req.user.role !== 'VET') {
    return res.status(403).json({ message: 'Only vets allowed' });
  }

  const { date } = req.query;

  const vetAppointments = appointments.filter(a =>
    a.vetId === req.user.id &&
    (!date || a.startTime.startsWith(date))
  );

  res.json(vetAppointments);
};

