const {
    updateUser,
    deleteUser,
    findUserById,
    getUsersExceptOne,
    getUsers
} = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        let users = await getUsers();
        return res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
}

const getUsersExceptLoggedInUser = async (req, res) => {
    console.log(req.user.id)
    try {
        let user = await findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: `User with id:${req.user.id} not found !` });
        }
        const users = await getUsersExceptOne(req.user.id);
        return res.status(200).json({ message: 'Users fetched successfullly', users });
    } catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
}

const deleteUserById = async (req, res) => {
    try {
        let user = await findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: `User with id:${req.params.id} not found !` });
        }
        await deleteUser(req.params.id);
        return res.status(200).json({ message: `User with id:${req.params.id} deleted successfully!` });
    } catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
}

const updateUserById = async (req, res) => {
    console.log("updateUserById", req.body)
    try {
        let user = await findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: `User with id:${req.params.id} not found !` });
        }
        let newUser = await updateUser(req.params.id, req.body);
        return res.status(200).json({ message: 'User updated successfully', user: newUser })
    } catch (error) {
        return res.status(500).json({ message: error.message, error })
    }
}

module.exports = {
    deleteUserById,
    updateUserById,
    getUsersExceptLoggedInUser,
    getAllUsers
}