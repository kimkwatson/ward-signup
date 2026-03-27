const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

// get all users
router.get("/", usersController.getUsers);

// get one user by id
router.get("/:id", usersController.getUserById);

// create new user
router.post("/", (req, res) => {
  res.status(201).json({ message: "createUser stub", body: req.body });
});

// update user by id
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "updateUser stub",
    id: req.params.id,
    body: req.body
  });
});

// delete user by id
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "deleteUser stub", id: req.params.id });
});

module.exports = router;