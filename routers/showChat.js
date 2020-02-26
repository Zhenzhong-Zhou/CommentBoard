// display chatting page
exports.showChat = (req, res, next) => {
    res.render("chat", {
        "login": req.session.login === "1",
        "username": req.session.login === "1" ? req.session.username : "",
        "active": "Chatting Room"
    });
};