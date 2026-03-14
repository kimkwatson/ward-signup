const express = require("express");
const router = express.Router();

const {
  getClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim
} = require("../controllers/claimController");

// get all claims
router.get("/", getClaims);

// get one claim by id
router.get("/:id", getClaimById);

// create new claim
router.post("/", createClaim);

// update claim by id
router.put("/:id", updateClaim);

// delete claim by id
router.delete("/:id", deleteClaim);

module.exports = router;