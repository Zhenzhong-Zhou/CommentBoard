const db = require("../models/db.js");

// display al users
exports.showAll_users = (req, res, next) => {
    db.findUser("users_info", {}, (err, result) => {
        res.render("users_list", {
            "login": req.session.login === "1",
            "username": req.session.login === "1" ? req.session.username: "",
            "active": "All Users",
            "users_list": result
        });
    });
};