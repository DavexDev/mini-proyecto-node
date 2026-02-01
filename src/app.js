import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import servicesRoutes from './routes/services.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import petsRoutes from './routes/pets.routes.js';
import vetsRoutes from './routes/vets.routes.js';

import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/services', servicesRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/pets', petsRoutes);
app.use('/vets', vetsRoutes);

// Health
app.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

// 🚨 ESTE SIEMPRE VA AL FINAL Y ANTES DEL EXPORT
app.use(errorHandler);

export default app;
