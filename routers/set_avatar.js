// display set avatar
// this page must be login
exports.showSet_avatar = (req, res, next) => {
    if (req.session.login !== "1") {
        res.end("You are NOT able to get this page without login!");
    }
    res.render("set_avatar", {
        "login": true,
        "username": req.session.username || "",
        "active": "set avatar"
    });
};