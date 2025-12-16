// C:\CamilaSerniotti-TPFinal\backend\src\models\user.model.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Asegúrate de tener instalado: npm install bcryptjs

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        // Puedes agregar validación de formato si lo deseas
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6,
        select: false, // ⬅️ CRÍTICO: Por defecto, no enviamos la contraseña en las consultas
    },
    // ... otros campos si los necesitas
});

// ----------------------------------------------------
// MIDDLEWARE DE MONGOOSE: ENCRIPTACIÓN DE CONTRASEÑA
// ----------------------------------------------------
// Se ejecuta ANTES de que un documento sea guardado (user.save())
userSchema.pre('save', async function (next) {
    // Solo si la contraseña ha sido modificada, la encriptamos
    if (!this.isModified('password')) return next();

    // Encriptamos la contraseña con un 'salt' de 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// ----------------------------------------------------
// MÉTODO DE INSTANCIA: COMPARAR CONTRASEÑAS
// ----------------------------------------------------
// 🎯 CRÍTICO: Esta función es la que tu loginController llama (user.comparePassword)
userSchema.methods.comparePassword = async function (
    candidatePassword, // Contraseña que viene del formulario (texto plano)
    userPassword      // Hash de la contraseña guardado en la DB
) {
    // Compara la contraseña en texto plano con el hash guardado
    return await bcrypt.compare(candidatePassword, userPassword);
};


const UserModel = mongoose.model('User', userSchema);
export default UserModel;