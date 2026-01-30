let services = [];
let serviceId = 1;

export const getServices = (req, res) => {
  res.json(services);
};

export const createService = (req, res) => {
  const { name, duration, price } = req.body;

 if (
  !name ||
  typeof duration !== 'number' ||
  typeof price !== 'number'
) {
  return res.status(400).json({ message: 'Invalid fields' });
}


  const service = {
    id: serviceId++,
    name,
    duration,
    price
  };

  services.push(service);
  res.status(201).json(service);
};

export const deleteService = (req, res) => {
  const { id } = req.params;

  const exists = services.some(s => s.id === Number(id));
  if (!exists) {
    return res.status(404).json({ message: 'Service not found' });
  }

  services = services.filter(s => s.id !== Number(id));
  res.json({ message: 'Service deleted' });
};
