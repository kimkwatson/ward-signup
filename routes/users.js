const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// get all users
router.get("/", getUsers);

// get one user by id
router.get("/:id", getUserById);

// create new user
router.post("/", createUser);

// update user by id
router.put("/:id", updateUser);

// delete user by id
router.delete("/:id", deleteUser);

module.exports = router;