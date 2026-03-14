const express = require("express");
const router = express.Router();

const slotsController = require("../controllers/slots");

// get all slots
router.get("/", slotsController.getSlots);

// get one slot by id
router.get("/:id", slotsController.getSlotById);

// create new slot
router.post("/", slotsController.createSlot);

// update slot by id
router.put("/:id", slotsController.updateSlot);

// delete slot by id
router.delete("/:id", slotsController.deleteSlot);

module.exports = router;