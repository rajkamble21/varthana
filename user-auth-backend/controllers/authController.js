const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser, getUsers } = require('../services/authService');


const register = async (req, res) => {
    try {
        let user = await findUserByEmail(req.body.email);
        if (user) {
            return res.status(400).json({ message: 'user already exists with that email' });
        }

        const newUser = await createUser(req.body);
        return res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
}

const login = async (req, res) => {
    try {
        let user = await findUserByEmail(req.body.email);

        if (!user) {
            return res.status(400).json({ message: 'invalid email' });
        }

        let isValid = user.validatePassword(req.body.password);
        if (!isValid) {
            return res.status(400).json({ message: 'invalid password' });
        }

        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        let users = await getUsers();
        return res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
}

module.exports = {
    register,
    login,
    getAllUsers
}