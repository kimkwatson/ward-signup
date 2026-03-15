const express = require("express");
const router = express.Router();

const slotsController = require("../controllers/slots");

// get all slots
router.get("/", (req, res) => {
  res.status(200).json({ message: "getSlots stub" });
});

// get one slot by id
router.get("/:id", (req, res) => {
  res.status(200).json({ message: "getSlotById stub", id: req.params.id });
});

// create new slot
router.post("/", (req, res) => {
  res.status(201).json({ message: "createSlot stub", body: req.body });
});

// update slot by id
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "updateSlot stub",
    id: req.params.id,
    body: req.body
  });
});

// delete slot by id
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "deleteSlot stub", id: req.params.id });
});

module.exports = router;