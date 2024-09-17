const router = require("express").Router();
const { register, login } = require('../controllers/authController');
const { validateBody, validateParams } = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/authValidation');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

module.exports = router;