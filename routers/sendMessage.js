const formidable = require("formidable");
const db = require("../models/db.js");

// send message action
exports.sendMessage = (req, res, next) => {
    // must be login
    if (req.session.login !== "1") {
        res.end("You are NOT able to get this page without login!");
    }
    // username is from session
    const username = req.session.username;
    // get user's input
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        // after getting form
        // may customize post info such as: topics
        const message = fields.message;

        // insert data
        db.insertOne("messages", {
            "username": username,
            "datetime": new Date(),
            "message": message
        }, (err, result) => {
            if (err) {
                res.send("-3");     // server crash
                return;
            }
            res.send("1");      // post message successfully
        });
    });
};
