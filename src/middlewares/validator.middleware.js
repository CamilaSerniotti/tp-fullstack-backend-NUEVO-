// C:\CamilaSerniotti-TPFinal\backend\src\middlewares\validator.middleware.js

// Esta función recibe un esquema de Joi y devuelve un middleware.
const validatorMiddleware = (schema) => (req, res, next) => {
    
    // 🎯 CORRECCIÓN CLAVE: Determinar qué objeto validar
    let dataToValidate = {};

    // 1. Si el esquema tiene la propiedad 'body', validamos req.body
    if (schema.body) {
        dataToValidate = req.body;
    } 
    // 2. Si el esquema tiene 'params', validamos req.params
    else if (schema.params) {
        dataToValidate = req.params;
    }
    // 3. Si el esquema tiene 'query', validamos req.query
    else if (schema.query) {
        dataToValidate = req.query;
    } 
    // 4. Si el esquema es un objeto simple (como registerSchema ahora), validamos directamente req.body
    // ¡Esta es la corrección crucial para tu caso actual!
    else {
        dataToValidate = req.body;
    }
    
    // Validamos la data contra el esquema
    const { error } = schema.validate(dataToValidate, {
        abortEarly: false, 
        allowUnknown: true, 
    });

    if (error) {
        // Responder directamente con JSON 400 (Bad Request)
        const validationErrors = error.details.map(err => ({
            field: err.context.key, 
            message: err.message,   
        }));

        return res.status(400).json({
            status: 'error',
            message: 'Error de validación en la petición.',
            errors: validationErrors,
        });
    }

    // Si la validación es exitosa, continuamos
    next();
};

export default validatorMiddleware;