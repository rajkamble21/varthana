const joi = require('joi');
const { password, phone } = require('./customValidation');

const updateUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().custom(password).required(),
    phone: joi.string().custom(phone).required(),
    address: joi.string().min(5).max(100).optional(),
    permanent_address: joi.string().min(5).max(100).optional()
})

module.exports = {
    updateUserSchema,
}