// backend/src/repositories/user.repository.js
import User from '../models/User.js'; 

/**
 * Busca un usuario por su dirección de email.
 * Usado en el login y el registro.
 */
export const findByEmail = (email) => {
    return User.findOne({ email });
};

/**
 * Busca un usuario por su ID.
 * Usado en el middleware de autenticación (req.user).
 */
export const findById = (id) => {
    // Excluye la contraseña en la búsqueda
    return User.findById(id).select('-password'); 
};

/**
 * Crea un nuevo usuario en la base de datos.
 */
export const create = (userData) => {
    return User.create(userData);
};

/**
 * Busca un usuario por su token de verificación y lo actualiza.
 * Usado en el servicio de verificación de email.
 */
export const findByTokenAndUpdate = (token, updateData) => {
    // Busca por el verificationToken y aplica las actualizaciones (ej: isVerified: true)
    return User.findOneAndUpdate({ verificationToken: token }, updateData, { new: true });
};