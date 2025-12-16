// backend/src/repositories/product.repository.js
import Product from '../models/Product.js'; // Asegúrate de importar tu modelo Product

// Crear un nuevo producto
export const create = (productData) => {
    return Product.create(productData);
};

// Obtener todos los productos (con populate para cumplir el requisito de relación)
export const findAll = () => {
    // Usamos .populate('owner') para obtener los detalles del usuario que lo creó
    return Product.find().populate('owner', 'name email'); 
};

// Obtener un producto por ID (con populate)
export const findById = (id) => {
    return Product.findById(id).populate('owner', 'name email');
};

// Actualizar un producto por ID
export const update = (id, updateData) => {
    return Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// Eliminar un producto por ID
export const remove = (id) => {
    return Product.findByIdAndDelete(id);
};