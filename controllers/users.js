const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// get all users
const getUsers = async (req, res) => {
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

// create new user
const createUser = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
        };

        const response = await mongodb
                    .getDb()
                    .db()
                    .collection("users")
                    .insertOne(user);
        
                return res.status(201).json({ id: response.insertedId });
            } catch(err) {
                console.error(err);
                return res.status(500).json({ message: "An error occurred while creating the user." });
            }
};

// update user by ID
const updateUser = async (req, res) => {
    try{
        const userId = new ObjectId(req.params.id);
        
        const user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
        };
        
        const response = await mongodb
            .getDb()
            .db()
            .collection("users")
            .replaceOne({ _id: userId }, user);
        
            if (response.matchedCount > 0) {
                return res.status(204).send();
        } else {
            return res.status(404).json({ message: "User not found." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while updating the user." });
    }
    
};

// delete user by id
const deleteUser = async (req, res) => {
    try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db().collection("users").deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
        return res.status(200).send();
    } else {
        return res.status(404).json({ message: "User not found." });
    }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while deleting the user." });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };const { getDb } = require("../db/connect");

const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers };