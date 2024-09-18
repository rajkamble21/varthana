const router = require("express").Router();
const { getAllUsers } = require('../controllers/authController');
const { deleteUserById } = require('../controllers/userController');
const auth = require('../middlewares/auth')

router.get('/', auth, getAllUsers);
router.delete('/:id', auth, deleteUserById);

module.exports = router;

