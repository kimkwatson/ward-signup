const express = require("express");
const router = express.Router();

const claimsController = require("../controllers/claims");

// get all claims
router.get("/", (req, res) => {
  res.status(200).json({ message: "getClaims stub" });
});

// get one claim by id
router.get("/:id", (req, res) => {
  res.status(200).json({ message: "getClaimById stub", id: req.params.id });
});

// create new claim
router.post("/", (req, res) => {
  res.status(201).json({ message: "createClaim stub", body: req.body });
});

// update claim by id
router.put("/:id", (req, res) => {
  res.status(200).json({ message: "updateClaim stub", id: req.params.id });
});

// delete claim by id
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "deleteClaim stub", id: req.params.id });
});

module.exports = router;