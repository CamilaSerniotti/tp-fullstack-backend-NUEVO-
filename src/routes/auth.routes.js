// C:\CamilaSerniotti-TPFinal\backend\src\routes\auth.routes.js

import { Router } from 'express';
// 1. Importa todos los controladores de autenticación.
import * as authController from '../controllers/auth.controller.js'; 
// 2. Importa el middleware de validación
import validatorMiddleware from '../middlewares/validator.middleware.js'; 
// 3. Importa Joi para definir los esquemas
import Joi from 'joi'; 

const router = Router();

// ===========================================
// ESQUEMAS DE VALIDACIÓN CON JOI (¡CORREGIDOS!)
// ===========================================

// Esquema para la validación de Registro: name, email y password (min 6 caracteres)
const registerSchema = Joi.object({
    // 🎯 CORRECCIÓN CLAVE: Eliminamos la capa 'body:' para que Joi valide directamente los campos que llegan en req.body
    name: Joi.string().min(3).max(50).required().messages({
        'any.required': 'El nombre es requerido',
        'string.min': 'El nombre debe tener al menos 3 caracteres'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'El email es requerido',
        'string.email': 'El email debe ser válido'
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'La contraseña es requerida',
        'string.min': 'La contraseña debe tener al menos 6 caracteres'
    }), 
});

// Esquema para la validación de Login: email y password
const loginSchema = Joi.object({
    // 🎯 CORRECCIÓN CLAVE: Eliminamos la capa 'body:'
    email: Joi.string().email().required().messages({
        'any.required': 'El email es requerido',
        'string.email': 'El email debe ser válido'
    }), 
    password: Joi.string().required().messages({
        'any.required': 'La contraseña es requerida',
    }), 
});

// ===========================================
// DEFINICIÓN DE RUTAS PÚBLICAS
// ===========================================

// RUTA 1: Registro (POST /api/v1/auth/register)
router.post(
    '/register',
    validatorMiddleware(registerSchema), // Valida los datos de entrada
    authController.registerController // Llama a la función de registro
);

// RUTA 2: Login (POST /api/v1/auth/login)
router.post(
    '/login',
    validatorMiddleware(loginSchema), // Valida que email y password estén presentes
    authController.loginController // Llama a la función de login
);

// RUTA 3: Verificación de Email
router.get(
    '/verify-email/:token',
    authController.verifyEmailController // Llama a la función de verificación
);

// ===========================================
// EXPORTACIÓN FINAL (CRÍTICA)
// ===========================================

// Exportación con nombre 'authRoutes' para que app.js pueda importarla con { authRoutes }
export { router as authRoutes };