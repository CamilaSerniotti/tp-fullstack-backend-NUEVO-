// C:\CamilaSerniotti-TPFinal\backend\src\controllers\auth.controller.js

import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js'; 
// Asegúrate de que UserModel esté definido y exportado en user.model.js

// ----------------------------------------------------
// FUNCIÓN AUXILIAR: Generar Token JWT (Necesaria para Login)
// ----------------------------------------------------
const signToken = (id) => {
    // La clave secreta y el tiempo de expiración se leen de .env
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// ====================================================
// 1. CONTROLADOR DE REGISTRO
// ====================================================
export const registerController = async (req, res) => {
    try {
        // Lee name, email y password del cuerpo de la solicitud (req.body)
        const { name, email, password } = req.body;
        
        // Crea un nuevo usuario. Mongoose y tu pre-save hook se encargan de hashear la contraseña.
        const newUser = await UserModel.create({ name, email, password });
        
        // Por seguridad, no enviamos la contraseña hasheada en la respuesta
        newUser.password = undefined; 

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado con éxito. Puede iniciar sesión.',
            data: {
                user: newUser,
            },
        });

    } catch (err) {
        // Manejo de error específico de duplicidad (código 11000 de MongoDB)
        if (err.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'El email ya se encuentra registrado.',
            });
        }
        console.error("Error en registerController:", err);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error en el servidor durante el registro.',
        });
    }
};


// ====================================================
// 2. CONTROLADOR DE LOGIN
// ====================================================
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar el usuario por email y seleccionar la contraseña (que normalmente está oculta)
        const user = await UserModel.findOne({ email }).select('+password');

        // 2. Verificar si el usuario existe y si la contraseña es correcta
        // La función user.comparePassword debe estar definida en tu user.model.js
        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Email o contraseña incorrectos.',
            });
        }

        // 3. Generar el token JWT
        const token = signToken(user._id);
        
        // Ocultar la contraseña antes de enviar la respuesta
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            message: 'Inicio de sesión exitoso',
            token,
            data: {
                user,
            },
        });

    } catch (err) {
        console.error("Error en loginController:", err);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error en el servidor durante el inicio de sesión.',
        });
    }
};

// ====================================================
// 3. CONTROLADOR DE VERIFICACIÓN DE EMAIL (Placeholder)
// ====================================================
export const verifyEmailController = (req, res) => {
    // Esta es una función temporal que evita que el servidor se caiga, ya que está definida en tus rutas.
    res.status(501).json({
        status: 'info',
        message: 'Endpoint de verificación de email aún no implementado.',
        token: req.params.token
    });
};
