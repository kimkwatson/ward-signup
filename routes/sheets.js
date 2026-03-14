const express = require("express");
const router = express.Router();

const sheetsController = require("../controllers/sheets");

// get all sheets
router.get("/", sheetsController.getSheets);

// get one sheet by id
router.get("/:id", sheetsController.getSheetById);

// create new sheet
router.post("/", sheetsController.createSheet);

// update sheet by id
router.put("/:id", sheetsController.updateSheet);

// delete sheet by id
router.delete("/:id", sheetsController.deleteSheet);

module.exports = router;