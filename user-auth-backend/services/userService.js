const { Op, where } = require('sequelize');

const { User, Address, Master } = require('../models');

const findUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        console.log("error during findUserById", error);
    }
}

const findUserByEmail = async (email) => {
    try {
        let user = await User.findOne({ where: { email }, include: [{ model: Address }, { model: Master }] });
        return user;
    } catch (error) {
        console.log(`error during findUserByEmail`, error);
    }

}

const createUser = async (requestBody) => {
    try {
        const newUser = await User.create(requestBody);
        console.log("createUser", createUser);
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

const getUsersExceptOne = async (id) => {
    try {
        const loggedInUser = await User.findByPk(id, {
            include: [{ model: Address }, { model: Master }]
        });


        let users = await User.findAll({
            where: {
                id: {
                    [Op.ne]: id
                }
            },
            include: [{ model: Address }, { model: Master }]
        });

        if (loggedInUser.Master.role === "read") {
            const loggedInUserCity = loggedInUser.Address?.address.current_address?.city;
            if (!loggedInUserCity) {
                return [];
            }
            users = users.reduce((acc, us) => {
                if (us.Address?.address.current_address?.city &&
                    us.Address?.address.current_address?.city == loggedInUserCity) {
                    acc.push(us);
                }
                return acc;
            }, [])

        }

        return users;
    } catch (error) {
        console.log("error during getAllUsersExceptOne", error);
    }
}

const updateUser = async (id, requestBody) => {
    try {

        const { current_street,
            current_city,
            current_state,
            current_pincode,
            permanent_street,
            permanent_city,
            permanent_state,
            permanent_pincode,
            ...userData } = requestBody;

        const user = await User.findByPk(id, {
            include: [{ model: Address }]
        });

        const current_address = {
            street: current_street,
            city: current_city,
            state: current_state,
            pincode: current_pincode,
        };

        const permanent_address = {
            street: permanent_street,
            city: permanent_city,
            state: permanent_state,
            pincode: permanent_pincode,
        };

        await user.update(userData);

        if (user.Address) {
            await user.Address.update({
                address: {
                    current_address,
                    permanent_address
                }
            });
        } else {
            await Address.create({
                address: {
                    current_address,
                    permanent_address
                },
                userId: user.id
            });

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
        const user = await User.findByPk(id, {
            include: [{ model: Address }]
        });
        await user.destroy();
    } catch (error) {
        console.log("Error during deleteUser:", error);
    }
}

const addMutipleUsers = async ({ users }) => {
    try {


        let createdUsers = [];
        let alreadyExistingUsers = [];

        const userPromises = users.map(async (user) => {
            let userExists = await findUserByEmail(user.email);
            if (userExists) {
                alreadyExistingUsers.push(userExists);
            } else {
                const { current_street,
                    current_city,
                    current_state,
                    current_pincode,
                    permanent_street,
                    permanent_city,
                    permanent_state,
                    permanent_pincode,
                    name, email, phone } = user;

                const current_address = {
                    street: current_street,
                    city: current_city,
                    state: current_state,
                    pincode: current_pincode,
                };

                const permanent_address = {
                    street: permanent_street,
                    city: permanent_city,
                    state: permanent_state,
                    pincode: permanent_pincode,
                };
                let createdUser = await createUser({ name, email, password: "pass@#123", phone });
                await Address.create({
                    address: {
                        current_address,
                        permanent_address
                    },
                    userId: createdUser.id
                });

                const createdUserDetails = await User.findByPk(createdUser.id, {
                    include: [{ model: Address }]
                });

                createdUsers.push(createdUserDetails);
            }
        });


        await Promise.all(userPromises);

        return { createdUsers, alreadyExistingUsers };
    } catch (error) {
        console.log("error in addMutipleUsers", error);
    }
}


module.exports = {
    updateUser,
    deleteUser,
    findUserById,
    getUsersExceptOne,
    getUsers,
    findUserByEmail,
    createUser,
    addMutipleUsers,
}