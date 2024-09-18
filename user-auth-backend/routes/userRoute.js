const router = require("express").Router();
const { getAllUsers } = require('../controllers/authController');
const { deleteUserById, updateUserById } = require('../controllers/userController');
const auth = require('../middlewares/auth')

router.get('/', auth, getAllUsers);
router.patch('/:id', auth, updateUserById);
router.delete('/:id', auth, deleteUserById);

module.exports = router;

