// src/utils/jwt.util.js
import jwt from 'jsonwebtoken';

// Asegúrate de que tu JWT_SECRET esté definido en tu archivo .env
// Ejemplo: JWT_SECRET=tu_clave_secreta_muy_larga
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '1d'; // El token expira en 1 día

/**
 * Crea un token JWT para un usuario.
 * @param {object} payload - La información que quieres guardar en el token (ej: id del usuario).
 * @returns {string} El token JWT generado.
 */
export const createToken = (payload) => {
    // Puedes guardar el ID del usuario u otra data no sensible en el payload
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
};

/**
 * Verifica y decodifica el token.
 * (La usaremos en el Middleware de autenticación)
 */
export const verifyToken = (token) => {
    try {
        // Devuelve el payload si el token es válido
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        // Devuelve null si el token es inválido o expiró
        return null; 
    }
};

// Puedes exportar solo createToken si solo quieres enfocarte en el login por ahora