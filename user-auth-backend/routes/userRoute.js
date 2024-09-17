const router = require("express").Router();
const { getAllUsers } = require('../controllers/authController');
const auth = require('../middlewares/auth')

router.get('/', auth, getAllUsers)

module.exports = router;

