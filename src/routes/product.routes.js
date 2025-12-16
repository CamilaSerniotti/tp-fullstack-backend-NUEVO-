// backend/src/routes/product.routes.js
import { Router } from 'express';
import Joi from 'joi';
import * as productController from '../controllers/product.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; // ¡Importante!
import validatorMiddleware from '../middlewares/validator.middleware.js';

const router = Router();

// --- ESQUEMAS DE VALIDACIÓN CON JOI ---
const idSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().hex().length(24).required() // Validación básica para Mongoose ID
    }).required(),
});

const productSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().min(0.01).required(),
        // owner no se incluye, ya que se toma del token JWT
    }).required(),
});
// ----------------------------------------


// RUTA 1: CREAR PRODUCTO (PROTEGIDA POR AUTH)
// Flujo: Petición -> JWT Auth -> Validación -> Controlador
router.post(
    '/',
    authMiddleware, // APLICA LA SEGURIDAD JWT
    validatorMiddleware(productSchema),
    productController.createProductController
);

// RUTA 2: OBTENER TODOS LOS PRODUCTOS (Puede ser pública si quieres mostrar el catálogo)
router.get('/', productController.getAllProductsController);

// RUTA 3: OBTENER DETALLE, ACTUALIZAR y ELIMINAR (por ID)
router.route('/:id')
    .get(validatorMiddleware(idSchema), productController.getProductByIdController)

    // ACTUALIZAR (PROTEGIDA POR AUTH y Validación de ID/Body)
    .put(
        authMiddleware, // APLICA LA SEGURIDAD JWT
        validatorMiddleware(idSchema),
        validatorMiddleware(productSchema),
        productController.updateProductController
    )
    // ELIMINAR (PROTEGIDA POR AUTH y Validación de ID)
    .delete(
        authMiddleware, // APLICA LA SEGURIDAD JWT
        validatorMiddleware(idSchema),
        productController.deleteProductController
    );

export default router;