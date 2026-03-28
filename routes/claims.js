const express = require("express");
const router = express.Router();

const claimsController = require("../controllers/claims");
const validate = require("../middleware/claims-validation");

// get all claims
router.get("/", claimsController.getClaims);

// get one claim by id
router.get("/:id", claimsController.getClaimById);

// create new claim
router.post("/", validate.claimsRules(), validate.checkData, claimsController.createClaim);

// update claim by id
router.put("/:id", validate.claimsRules(), validate.checkData, claimsController.updateClaim);

// delete claim by id
router.delete("/:id", claimsController.deleteClaim);

module.exports = router;