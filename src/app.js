// C:\CamilaSerniotti-TPFinal\backend\src\app.js
import express from 'express';
import cors from 'cors';

// 1. IMPORTACIONES DE RUTAS
import { authRoutes } from './routes/auth.routes.js'; 

const app = express();

// =========================================================
// 1. CONFIGURACIÓN DEL MIDDLEWARE GLOBAL
// =========================================================

// ✅ Esto permite que Vercel se conecte sin restricciones de política CORS
app.use(cors());

// 🎯 Middleware para parsear JSON - Debe ir antes de las rutas
app.use(express.json());

// ---------------------------------------------------------
// 2. DEFINICIÓN Y ACTIVACIÓN DE RUTAS
// ---------------------------------------------------------

// Ruta de prueba (Health Check)
app.get('/', (req, res) => {
  res.send('API corriendo y lista.');
});

// 🛑 RUTA DE AUTENTICACIÓN (Login/Registro)
app.use('/api/v1/auth', authRoutes); 

export default app;