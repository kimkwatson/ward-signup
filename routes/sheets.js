const express = require("express");
const router = express.Router();

const {
  getSheets,
  getSheetById,
  createSheet,
  updateSheet,
  deleteSheet
} = require("../controllers/sheetController");

// get all sheets
router.get("/", getSheets);

// get one sheet by id
router.get("/:id", getSheetById);

// create new sheet
router.post("/", createSheet);

// update sheet by id
router.put("/:id", updateSheet);

// delete sheet by id
router.delete("/:id", deleteSheet);

module.exports = router;