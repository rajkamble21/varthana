const { where } = require('sequelize');
const { User } = require('../models');

const findUserByEmail = async (email) => {
    try {
        let user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.log(`error during findUserByEmail`, error);
    }

}

const createUser = async (requestBody) => {
    try {
        const newUser = await User.create(requestBody);
        return newUser;
    } catch (error) {
        console.log(`error during createUser`, error);
    }
}

const getUsers = async () => {
    try {
        let users = await User.findAll();
        return users;
    } catch (error) {
        console.log(`error during getUsers`, error);
    }
}

module.exports = {
    findUserByEmail,
    createUser,
    getUsers
}