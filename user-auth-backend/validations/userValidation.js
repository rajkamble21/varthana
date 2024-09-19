const joi = require('joi');
const { phone } = require('./customValidation');

const updateUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().custom(phone).required(),
    address: joi.string().min(15).max(100).required(),
    permanent_address: joi.string().min(15).max(100).required(),
})

const userIdSchema = joi.object({
    id: joi.number().integer().required(),
})


module.exports = {
    updateUserSchema,
    userIdSchema
}