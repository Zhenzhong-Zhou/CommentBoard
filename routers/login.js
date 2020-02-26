// display login page
exports.showLogin = (req, res, next) => {
    console.log("login.js: " + "req.session.login: " + req.session.login + " req.session.username: " + req.session.username);
    res.render("login", {
        "login": req.session.login === "1",
        "username": req.session.login === "1" ? req.session.username: "",
        "active": "Sign in"
    });
};