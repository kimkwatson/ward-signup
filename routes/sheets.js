const express = require("express");
const router = express.Router();

const sheetsController = require("../controllers/sheets");

// get all sheets
router.get("/", (req, res) => {
  res.status(200).json({ message: "getSheets stub" });
});

// get one sheet by id
router.get("/:id", (req, res) => {
  res.status(200).json({ message: "getSheetById stub", id: req.params.id });
});

// create new sheet
router.post("/", (req, res) => {
  res.status(201).json({ message: "createSheet stub", body: req.body });
});

// update sheet by id
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "updateSheet stub",
    id: req.params.id,
    body: req.body
  });
});

// delete sheet by id
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "deleteSheet stub", id: req.params.id });
});

module.exports = router;