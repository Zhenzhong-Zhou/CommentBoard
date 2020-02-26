const db = require("../models/db.js");

// display index page
exports.showIndex = (req, res, next) => {
    console.log("index.js: " + "req.session.login: " + req.session.login + " req.session.username: " + req.session.username);
    // search data: find user's avatar
    if (req.session.login === "1") {
        // user is signed in, search database and find avatar
        db.findUser("users_info", {"username": req.session.username}, (err, result) => {
            let avatar = result[0].avatar || "default.jpg";
            res.render("index", {
                "login": req.session.login === "1",
                "username": req.session.login === "1" ? result[0].username : "",
                "active": "Twitter",
                "avatar": avatar
            });
            console.log("index.js: " + req.session.username + result[0].username)
        });
    }else {
        // can use server side to find message but i will not do that
        res.render("index", {
            "login": req.session.login === "1",
            "username": req.session.login === "1" ? req.session.username: "",
            "active": "Twitter",
            "avatar": "default.jpg"
        });
    }
};