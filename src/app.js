// C:\CamilaSerniotti-TPFinal\backend\src\app.js

import express from 'express';
import cors from 'cors';

// 1. IMPORTACIONES DE RUTAS
import { authRoutes } from './routes/auth.routes.js'; 

const app = express();

// =========================================================
// 1. CONFIGURACIÓN DEL MIDDLEWARE GLOBAL
// =========================================================

// ✅ CAMBIO CLAVE: Esto permite que Vercel se conecte sin errores
app.use(cors());

// 🎯 Middleware para parsear JSON
app.use(express.json());

// ---------------------------------------------------------
// 2. DEFINICIÓN Y ACTIVACIÓN DE RUTAS
// ---------------------------------------------------------

// Ruta de prueba (Health Check)
app.get('/', (req, res) => {
  res.send('API corriendo y lista.');
});

// 🛑 RUTA DE AUTENTICACIÓN (Login/Registro)
// Prefijo: /api/v1/auth 
app.use('/api/v1/auth', authRoutes); 

export default app;