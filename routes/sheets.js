const express = require("express");
const router = express.Router();

const sheetsController = require("../controllers/sheets");
const validate = require("../middleware/sheets-validation");
const authenticate = require('../middleware/authentication');

// get all sheets
router.get("/", sheetsController.getSheets);

// get one sheet by id
router.get("/:id", sheetsController.getSheetById);

// create new sheet
router.post("/", authenticate, validate.sheetsRules(), validate.checkData, sheetsController.createSheet);

// update sheet by id
router.put("/:id", authenticate, validate.sheetsRules(), validate.checkData, sheetsController.updateSheet);

// delete sheet by id
router.delete("/:id", authenticate, sheetsController.deleteSheet);

module.exports = router;