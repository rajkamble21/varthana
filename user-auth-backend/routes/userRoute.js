const router = require("express").Router();
const { validateBody, validateParams } = require('../middlewares/validate');
const { deleteUserById, updateUserById, getUsersExceptLoggedInUser } = require('../controllers/userController');
const { updateUserSchema } = require('../validations/userValidation');
const auth = require('../middlewares/auth')

router.get('/', auth, getUsersExceptLoggedInUser);
router.patch('/:id', validateBody(updateUserSchema), auth, updateUserById);
router.delete('/:id', auth, deleteUserById);

module.exports = router;

