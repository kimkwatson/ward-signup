const express = require("express");
const router = express.Router();

const sheetsController = require("../controllers/sheets");
const validate = require("../middleware/sheets-validation");

// get all sheets
router.get("/", sheetsController.getSheets);

// get one sheet by id
router.get("/:id", sheetsController.getSheetById);

// create new sheet
router.post("/", validate.sheetsRules(), validate.checkData, sheetsController.createSheet);

// update sheet by id
router.put("/:id", validate.sheetsRules(), validate.checkData, sheetsController.updateSheet);

// delete sheet by id
router.delete("/:id", sheetsController.deleteSheet);

module.exports = router;