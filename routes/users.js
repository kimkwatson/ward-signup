const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const validate = require("../middleware/users-validation")

// get all users
router.get("/", usersController.getUsers);

// get one user by id
router.get("/:id", usersController.getUserById);

// create new user
router.post("/", validate.usersRules(), validate.checkData, usersController.createUser);

// update user by id
router.put("/:id", validate.usersRules(), validate.checkData, usersController.updateUser);

// delete user by id
router.delete("/:id", usersController.deleteUser);

module.exports = router;