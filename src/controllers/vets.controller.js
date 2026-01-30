// Mock de veterinarios
const vets = [
  {
    id: 1,
    name: 'Dr. Juan Pérez',
    specialty: 'general',
    workHours: {
      start: '09:00',
      end: '17:00'
    }
  },
  {
    id: 2,
    name: 'Dra. Ana López',
    specialty: 'cirugía',
    workHours: {
      start: '10:00',
      end: '18:00'
    }
  }
];

// Mock de citas (luego vendrán del controller real)

// GET /vets
export const getVets = (req, res) => {
  const { specialty } = req.query;

  if (specialty) {
    return res.json(
      vets.filter(v => v.specialty === specialty)
    );
  }

  res.json(vets);
};

// GET /vets/:id/availability?date=YYYY-MM-DD
export const getVetAvailability = (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      message: 'date query param is required (YYYY-MM-DD)'
    });
  }

  const vet = vets.find(v => v.id === Number(id));
  if (!vet) {
    return res.status(404).json({ message: 'Vet not found' });
  }

  // Generar slots de 30 min
  const slots = [];
  let current = `${date}T${vet.workHours.start}`;
  const end = `${date}T${vet.workHours.end}`;

  while (new Date(current) < new Date(end)) {
    const next = new Date(new Date(current).getTime() + 30 * 60000);

    slots.push({
      start: current,
      end: next.toISOString().slice(0, 16)
    });

    current = next.toISOString().slice(0, 16);
  }

  // Quitar slots ya ocupados
  
const booked = [];

const availableSlots = slots.filter(
  slot =>
    !booked.some(
      b => b.startTime === slot.start
    )
);


  res.json({
    vetId: vet.id,
    date,
    availableSlots
  });
};

export { vets };
