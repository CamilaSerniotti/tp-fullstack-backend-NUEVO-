// backend/src/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // ⬅️ NUEVO: Necesario para hashear contraseñas

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // ⬅️ RECOMENDADO: Mínimo de caracteres
        select: false // ⬅️ CRÍTICO: No selecciona el password por defecto en las consultas
    },
    name: { 
        type: String,
        required: true,
    },
    // --- Campos OBLIGATORIOS de Seguridad ---
    isVerified: { 
        type: Boolean,
        default: false,
    },
    verificationToken: { 
        type: String,
        required: false,
    },
}, {
    timestamps: true 
});

// =============================================================
// 1. HOOK PRE-SAVE (Se ejecuta antes de guardar el documento)
// =============================================================
// Aquí hasheamos la contraseña si el usuario la modificó o es un registro nuevo
userSchema.pre('save', async function(next) {
    // Solo si la contraseña fue modificada (o es nueva)
    if (!this.isModified('password')) return next();
    
    // Hashear la contraseña con un costo (salt) de 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// =============================================================
// 2. MÉTODO DE INSTANCIA (Para usar en el Login)
// =============================================================
// Método para comparar la contraseña ingresada con el hash guardado en la DB
userSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
    // Retorna true si coinciden, false si no
    return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);
export default User;