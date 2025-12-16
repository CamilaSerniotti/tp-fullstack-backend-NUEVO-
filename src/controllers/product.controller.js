// backend/src/controllers/product.controller.js
import * as productService from '../services/product.service.js';

// Controlador para crear producto (Requiere Autenticación)
export const createProductController = async (req, res, next) => {
    try {
        // Obtenemos el ID del usuario logueado desde el middleware de autenticación
        const userId = req.user.id; 
        
        const newProduct = await productService.createProductService(req.body, userId);
        res.status(201).json({
            success: true,
            data: newProduct,
        });
    } catch (error) { next(error); }
};

// Controlador para listar todos los productos
export const getAllProductsController = async (req, res, next) => {
    try {
        const products = await productService.getAllProductsService();
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) { next(error); }
};

// Controlador para obtener un producto por ID
export const getProductByIdController = async (req, res, next) => {
    try {
        const product = await productService.getProductByIdService(req.params.id);
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) { next(error); }
};

// Controlador para actualizar producto (Requiere Autenticación y ser Dueño)
export const updateProductController = async (req, res, next) => {
    try {
        const userId = req.user.id; // Obtenemos el ID del dueño
        const updatedProduct = await productService.updateProductService(
            req.params.id, 
            req.body, 
            userId
        );
        res.status(200).json({
            success: true,
            data: updatedProduct,
        });
    } catch (error) { next(error); }
};

// Controlador para eliminar producto (Requiere Autenticación y ser Dueño)
export const deleteProductController = async (req, res, next) => {
    try {
        const userId = req.user.id; // Obtenemos el ID del dueño
        const result = await productService.deleteProductService(req.params.id, userId);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) { next(error); }
};