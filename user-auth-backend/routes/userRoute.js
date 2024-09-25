const router = require("express").Router();
const { validateBody, validateParams } = require('../middlewares/validate');
const { deleteUserById, updateUserById, getUsersExceptLoggedInUser, addUsersInBulk } = require('../controllers/userController');
const { updateUserSchema, userIdSchema, addUsersInBulkSchema } = require('../validations/userValidation');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

router.get('/', auth, getUsersExceptLoggedInUser);
router.put('/:id', validateParams(userIdSchema), validateBody(updateUserSchema), auth, adminOnly, updateUserById);
router.delete('/:id', validateParams(userIdSchema), auth, adminOnly, deleteUserById);
router.post('/bulk-add', validateBody(addUsersInBulkSchema), auth, adminOnly, addUsersInBulk);

module.exports = router;

