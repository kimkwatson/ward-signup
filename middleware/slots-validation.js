const { body, validationResult } = require("express-validator")
const validate = {}

validate.slotsRules = () => {
    return [
        // label is required and must be a string
        body("label")
            .trim()
            .isLength({ min: 3 }). withMessage("Label must be at least 3 characters in length.")
            .notEmpty().withMessage("Please provide a label.")
            .isString().withMessage("Label must contain letters only."),

        // details is required and must be a string
        body("details")
            .trim()
            .isLength({ min: 3 }). withMessage("Details must be at least 3 characters in length.")
            .notEmpty().withMessage("Please provide details for this slot.")
            .isString().withMessage("Details must contain letters only."),

        // quantity is required and must be an integer
        body("quantityNeeded")
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

module.exports = validate;