let appointments = [];
let appointmentId = 1;

export const createAppointment = (req, res) => {
  const { petId, vetId, serviceId, startTime, endTime } = req.body;

  if (!petId || !vetId || !serviceId || !startTime || !endTime) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const appointment = {
    id: appointmentId++,
    petId,
    vetId,
    serviceId,
    startTime,
    endTime,
    status: 'REQUESTED',
    clientId: req.user.id
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
