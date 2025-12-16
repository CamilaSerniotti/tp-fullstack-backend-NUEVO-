// backend/src/services/product.service.js
import * as productRepository from '../repositories/product.repository.js';

// Crear producto
export const createProductService = (payload, userId) => {
    // La lógica de negocio agrega el ID del usuario logueado como dueño
    const productData = { ...payload, owner: userId };
    return productRepository.create(productData);
};

// Listar todos los productos
export const getAllProductsService = () => {
    return productRepository.findAll();
};

// Obtener un producto por ID
export const getProductByIdService = (productId) => {
    const product = productRepository.findById(productId);
    if (!product) {
        const error = new Error('Producto no encontrado.');
        error.statusCode = 404;
        throw error;
    }
    return product;
};

// Actualizar producto
export const updateProductService = async (productId, payload, userId) => {
    const product = await productRepository.findById(productId);

    if (!product) {
        const error = new Error('Producto no encontrado para actualizar.');
        error.statusCode = 404;
        throw error;
    }

    // ** Lógica de Negocio OBLIGATORIA: Verificar si el usuario es el dueño **
    if (product.owner._id.toString() !== userId) {
        const error = new Error('No tienes permiso para actualizar este producto.');
        error.statusCode = 403; // 403 Forbidden
        throw error;
    }

    return productRepository.update(productId, payload);
};

// Eliminar producto
export const deleteProductService = async (productId, userId) => {
    const product = await productRepository.findById(productId);

    if (!product) {
        const error = new Error('Producto no encontrado para eliminar.');
        error.statusCode = 404;
        throw error;
    }
    
    // ** Lógica de Negocio OBLIGATORIA: Verificar si el usuario es el dueño **
    if (product.owner._id.toString() !== userId) {
        const error = new Error('No tienes permiso para eliminar este producto.');
        error.statusCode = 403; // 403 Forbidden
        throw error;
    }

    await productRepository.remove(productId);
    return { message: 'Producto eliminado exitosamente.' };
};