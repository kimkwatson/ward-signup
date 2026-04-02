const express = require("express");
const router = express.Router();

const claimsController = require("../controllers/claims");
const validate = require("../middleware/claims-validation");
const authenticate = require('../middleware/authentication');

// get all claims
router.get("/", claimsController.getClaims);

// get one claim by id
router.get("/:id", claimsController.getClaimById);

// create new claim
router.post("/", authenticate, validate.claimsRules(), validate.checkData, claimsController.createClaim);

// update claim by id
router.put("/:id", authenticate, validate.claimsRules(), validate.checkData, claimsController.updateClaim);

// delete claim by id
router.delete("/:id", authenticate, claimsController.deleteClaim);

module.exports = router;