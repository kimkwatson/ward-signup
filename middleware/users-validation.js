const { body, validationResult } = require("express-validator")
const validate = {}

validate.usersRules = () => {
    return [
        // name is required and must be a string
        body("name")
            .trim()
            .notEmpty().withMessage("Please provide a name.")
            .isString().withMessage("Name must contain letters only."),

        // email is required and must be valid
        body("email")
            .trim()
            .escape()
            .notEmpty().withMessage("Please provide an email address.")
            .isEmail()
            .normalizeEmail().withMessage("A valid email is required."),

        // phone number is required and must be valid
        body("phone")
            .trim()
            .isMobilePhone("en-US").withMessage("Please enter a valid phone number"),

        // role is optional but must be a string
        body("role")
            .trim()
            .isString().withMessage("Role must contain letters only."),
    ]
}

validate.checkData = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.arra })
    }

    next();
}

module.exports = validate;