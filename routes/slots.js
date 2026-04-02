const express = require("express");
const router = express.Router();

const slotsController = require("../controllers/slots");
const validate = require("../middleware/slots-validation");
const authenticate = require('../middleware/authentication');

// get all slots
router.get("/", slotsController.getSlots);

// get one slot by id
router.get("/:id", slotsController.getSlotById);

// create new slot
router.post("/", authenticate, validate.slotsRules(), validate.checkData, slotsController.createSlot);

// update slot by id
router.put("/:id", authenticate, validate.slotsRules(), validate.checkData, slotsController.updateSlot);

// delete slot by id
router.delete("/:id", authenticate, slotsController.deleteSlot);

module.exports = router;