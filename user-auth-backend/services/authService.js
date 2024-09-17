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

module.exports = {
    findUserByEmail,
    createUser
}