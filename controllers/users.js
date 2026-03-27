const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// get all users
const getUsers = async (req, res, next) => {
    try {
        const lists = await mongodb
            .getDb()
            .db()
            .collection('users')
            .find()
            .toArray();

        return res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving users." });
    }
};

// get one user by id
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }

        const user = await mongodb
            .getDb()
            .db()
            .collection('users')
            .findOne({ _id: new ObjectId(id) });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving user."});
    }
};

module.exports = { getUsers, getUserById };