const router = require("express").Router();
const { validateBody, validateParams } = require('../middlewares/validate');
const { deleteUserById, updateUserById, getUsersExceptLoggedInUser } = require('../controllers/userController');
const { updateUserSchema, userIdSchema } = require('../validations/userValidation');
const auth = require('../middlewares/auth')

router.get('/', auth, getUsersExceptLoggedInUser);
router.put('/:id', validateParams(userIdSchema), validateBody(updateUserSchema), auth, updateUserById);
router.delete('/:id', validateParams(userIdSchema), auth, deleteUserById);

module.exports = router;

