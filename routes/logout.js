const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
    
        // destroy session cookie
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.send('Successfully logged out.');
        });
    });
});

module.exports = router;