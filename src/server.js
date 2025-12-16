// C:\CamilaSerniotti-TPFinal\backend\src\server.js

// Importar la librería que lee las variables de entorno (.env)
import 'dotenv/config'; 

// Importar la aplicación de Express (configuración de rutas y middlewares)
import app from './app.js'; 

// 🎯 CRÍTICO: Importar la función que maneja la conexión a la base de datos
import connectDB from './config/db.js';

// Definir el puerto del servidor, usando .env o 4000 por defecto
const PORT = process.env.PORT || 4000;

// ----------------------------------------------------
// Conexión a MongoDB y Arranque del Servidor
// ----------------------------------------------------

// 1. Conectar a la base de datos
connectDB()
    .then(() => {
        // 2. Si la conexión a la DB es exitosa, iniciar el servidor de Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
        });
    })
    .catch((error) => {
        // 3. Este catch maneja el error si la función connectDB falla
        console.error('❌ Error fatal al iniciar la aplicación:', error.message);
        process.exit(1); 
    });

