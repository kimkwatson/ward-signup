const { body, validationResult } = require("express-validator")
const validate = {}

validate.claimsRules = () => {
    return [
        // quantity is required and must be an integer
        body("quantityClaimed")
            .trim()
            .isInt({ min: 1 }).withMessage("Quantity must be at least 1.")
            .toInt(),
    ]
}

validate.checkData = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpy()) {
        return res.status(422).json({ errors: errors.arra })
    }

    next();
}