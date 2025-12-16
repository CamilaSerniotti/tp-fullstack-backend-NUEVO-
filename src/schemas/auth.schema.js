// C:\CamilaSerniotti-TPFinal\backend\src\schemas\auth.schema.js

import Joi from 'joi';

// Esquema para la validación del registro de un nuevo usuario
export const registerSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'El nombre es requerido',
      'string.base': 'El nombre debe ser una cadena de texto'
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'El email es requerido',
      'string.email': 'El email debe ser válido',
      'string.base': 'El email debe ser una cadena de texto'
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': 'La contraseña es requerida',
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.base': 'La contraseña debe ser una cadena de texto'
    }),
});

// Esquema para la validación del inicio de sesión (Login)
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'El email es requerido',
      'string.email': 'El email debe ser válido',
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': 'La contraseña es requerida',
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
    }),
});