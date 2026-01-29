import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import servicesRoutes from './routes/services.routes.js';
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/services', servicesRoutes);

// Ruta base (health check)
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Mini proyecto funcionando'
  });
});

export default app;
