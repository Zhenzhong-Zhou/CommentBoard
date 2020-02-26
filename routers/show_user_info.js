const db = require("../models/db.js");

// display user's personal info
exports.showUSer = (req, res, next) => {
    let user = req.params["user"];
    db.findUser("messages", {"username": user}, (err, result) => {
        db.findUser("users_info", {"username": user}, (err, image) => {
            res.render("user_profile", {
                "login": req.session.login === "1",
                "username": req.session.login === "1" ? req.session.username: "",
                "user": user,
                "active": "My Twitters",
                "posts": result,
                "user_image": image[0].avatar
            });
        });
    });
};