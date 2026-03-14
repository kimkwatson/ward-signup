const express = require("express");
const router = express.Router();

const claimsController = require("../controllers/claims");

// get all claims
router.get("/", claimsController.getClaims);

// get one claim by id
router.get("/:id", claimsController.getClaimById);

// create new claim
router.post("/", claimsController.createClaim);

// update claim by id
router.put("/:id", claimsController.updateClaim);

// delete claim by id
router.delete("/:id", claimsController.deleteClaim);

module.exports = router;