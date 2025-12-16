// C:\CamilaSerniotti-TPFinal\backend\src\app.js

import express from 'express';
import cors from 'cors';

// 1. IMPORTACIONES DE RUTAS
import { authRoutes } from './routes/auth.routes.js'; 
// import todoRoutes from './routes/todo.routes.js'; 

const app = express();

// =========================================================
// 1. CONFIGURACIÓN DEL MIDDLEWARE GLOBAL
// =========================================================

// Middleware para permitir CORS 
const allowedOrigins = [
  'http://localhost:5173', // Puerto de Vite/React
  'http://localhost:3000', // Puerto común de desarrollo
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin 'Origin' (Postman) o de orígenes permitidos
      if (!origin || allowedOrigins.indexOf(origin) !== -1) { 
        return callback(null, true);
      } 
      const msg = `La política CORS no permite el acceso desde el origen: ${origin}`;
      return callback(new Error(msg), false);
    },
    credentials: true,
  })
);

// 🎯 MOVIMIENTO CLAVE: Middleware para parsear JSON
// ¡DEBE EJECUTARSE AQUÍ, ANTES DE CUALQUIER RUTA O VALIDADOR!
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

// ... (Resto del código)

export default app;