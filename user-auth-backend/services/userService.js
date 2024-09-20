const { where } = require('sequelize');
const { Op } = require('sequelize');

const { User, Address } = require('../models');

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
            },
            include: [{ model: Address}]
        });
        return users;
    } catch (error) {
        console.log("error during getAllUsersExceptOne", error);
    }
}

const updateUser = async (id, requestBody) => {
    try {
        const user = await User.findByPk(id, {
            include: [{ model: Address }]
        });

        const { current_address, permanent_address, ...userData } = requestBody;

        await user.update(userData);
        if (user.addressId) {
            await user.Address.update({
                address: {
                    current_address: current_address,
                    permanent_address: permanent_address
                }
            });
        } else {
            const newAddress = await Address.create({
                address: {
                    current_address: current_address,
                    permanent_address: permanent_address
                }
            });
            await user.update({ addressId: newAddress.id });
            const updatedUser = await User.findByPk(id, {
                include: [{ model: Address }]
            });

            return updatedUser;

        }
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