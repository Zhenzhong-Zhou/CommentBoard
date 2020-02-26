// display sign up page
exports.showSign_up = (req, res, next) =>{
    console.log("sign_up.js: " + "req.session.login: " + req.session.login + " req.session.username: " + req.session.username);
    res.render("sign_up", {
        "login": req.session.login === "1",
        "username": req.session.login === "1" ? req.session.username : "",
        "active": "Sign up"
    });
};