const joi = require('joi');
const { password, phone } = require('./customValidation')

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().custom(password).required(),
    phone: joi.string().custom(phone).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

module.exports = {
    registerSchema,
    loginSchema
}

