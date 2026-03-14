const express = require("express");
const router = express.Router();

const {
  getSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot
} = require("../controllers/slotController");

// get all slots
router.get("/", getSlots);

// get one slot by id
router.get("/:id", getSlotById);

// create new slot
router.post("/", createSlot);

// update slot by id
router.put("/:id", updateSlot);

// delete slot by id
router.delete("/:id", deleteSlot);

module.exports = router;