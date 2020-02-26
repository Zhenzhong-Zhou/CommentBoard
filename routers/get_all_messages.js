const db = require("../models/db.js");

// get all messages
exports.getAll_messages = (req, res, next) => {
    db.getAllCount("messages", (count) => {
        res.send(count.toString());
    });
};