// C:\CamilaSerniotti-TPFinal\backend\src\db\db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 1. Cargar variables de entorno (si no lo haces en server.js)
dotenv.config();

/**
 * Función para establecer la conexión a la base de datos MongoDB.
 * Llama a esta función en tu server.js.
 */
const connectDB = async () => {
    // 🎯 CRÍTICO: Obtener la URL de conexión del archivo .env
    const DB_URI = process.env.MONGO_URI; 

    if (!DB_URI) {
        console.error("❌ ERROR CRÍTICO: MONGO_URI no está definido en el archivo .env.");
        process.exit(1);
    }
    
    try {
        // 2. Intentar conectar
        await mongoose.connect(DB_URI);
        
        console.log("✅ Conexión a MongoDB establecida con éxito.");

    } catch (err) {
        // 3. Capturar y mostrar el error real de la base de datos
        console.error("❌ ERROR AL CONECTAR A MONGODB:");
        console.error(`- Mensaje: ${err.message}`);
        console.error("\nPOSIBLES CAUSAS:");
        console.error("1. La contraseña en MONGO_URI es incorrecta.");
        console.error("2. La IP de tu red no está permitida en MongoDB Atlas.");
        console.error("3. El servidor está caído (revisa la configuración de Atlas).");

        // Detener la aplicación si la conexión a la base de datos falla
        process.exit(1); 
    }
};

export default connectDB;