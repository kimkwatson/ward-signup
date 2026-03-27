const { body, validationResult } = require("express-validator")
const validate = {}

validate.sheetsRules = () => {
    return [
        // title is required and must be a string
        body("title")
            .trim()
            .isLength({ min: 3 }). withMessage("Title must be at least 3 characters in length.")
            .notEmpty().withMessage("Please provide a title.")
            .isString().withMessage("Title must contain letters only."),

        // description is required and must be a string
        body("description")
            .trim()
            .isLength({ min: 10 }). withMessage("Description must be at least 10 characters in length.")
            .notEmpty().withMessage("Please provide a description.")
            .isString().withMessage("Description must contain letters only."),

        // date is required and must be valid
        body("date")
            .trim()
            .isISO8601().withMessage("Please use a valid date format (YYYY-MM-DD")
            .toDate(),

        // time is required and must be valid
        body("time")
            .trim()
            .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Please use a valid time format (HH:mm)"),

        // location is required must be a string
        body("location")
            .trim()
            .isLength({ min: 3 }). withMessage("Location must be at least 3 characters in length.")
            .notEmpty().withMessage("Please provide a location.")
            .isString().withMessage("Location must contain letters only."),

    ]
}

validate.checkData = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpy()) {
        return res.status(422).json({ errors: errors.arra })
    }

    next();
}