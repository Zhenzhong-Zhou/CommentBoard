const db = require("../models/db.js");

// get a specific user info
exports.getUsers_info = (req, res, next) => {
    let  username = req.query.username;
    db.findUser("users_info", {"username": username}, (err, result) => {
        let obj = {
            "username": result[0].username,
            "avatar": result[0].avatar,
            "_id": result[0]._id
        };
        res.json(obj);
    })
} ;