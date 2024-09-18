const { where } = require('sequelize');
const { User } = require('../models');

const findUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        console.log("error during findUserById", error);
    }
}

const updateUser = async (id, requestBody) => {
    try {
        const user = await User.findByPk(id);
        await user.update(requestBody);
        return user;
    } catch (error) {
        console.log("error during updateUser", error);

    }
}

const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        await user.destroy();
    } catch (error) {
        console.log("error during deleteUser", error);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    findUserById
}