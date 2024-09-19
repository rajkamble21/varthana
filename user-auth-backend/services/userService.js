const { where } = require('sequelize');
const { Op } = require('sequelize');

const { User } = require('../models');

const findUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        console.log("error during findUserById", error);
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

const getUsersExceptOne = async (id) => {
    try {
        const users = await User.findAll({
            where: {
                id: {
                    [Op.ne]: id
                }
            }
        });
        return users;
    } catch (error) {
        console.log("error during getAllUsersExceptOne", error);
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
    findUserById,
    getUsersExceptOne,
    getUsers
}