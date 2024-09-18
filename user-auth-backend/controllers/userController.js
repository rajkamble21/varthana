const {
    updateUser,
    deleteUser,
    findUserById
} = require('../services/userService');

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
    try {
        let user = await findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: `User with id:${req.params.id} not found !` });
        }
        let newUser = await updateUser(req.params.id, req.body);
        return res.status(200).json({ message: 'User updated successfully', newUser })
    } catch (error) {
        return res.status(500).json({ message: error.message, error })
    }
}

module.exports = {
    deleteUserById,
    updateUserById
}