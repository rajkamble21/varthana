const joi = require('joi');
const { phone } = require('./customValidation');

const updateUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().custom(phone).required(),
    current_street: joi.string().optional(),
    current_city: joi.string().optional(),
    current_state: joi.string().optional(),
    current_pincode: joi.string().optional(),
    permanent_street: joi.string().optional(),
    permanent_city: joi.string().optional(),
    permanent_state: joi.string().optional(),
    permanent_pincode: joi.string().optional()
})

const userIdSchema = joi.object({
    id: joi.number().integer().required(),
})


module.exports = {
    updateUserSchema,
    userIdSchema
}