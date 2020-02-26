const formidable = require("formidable");
const db = require("../models/db.js");
const md5 = require("../models/md5.js");

// do sign up action
exports.doSign_up = (req, res ,next) => {
    // get user's input
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        // after getting form, check database the user in the database or not
        const username = fields.username;
        const password = fields.password;

        console.log("do_sign_up.js - doSign_up: " + "username: " + username + " " + "password: " + password);

        db.findUser("users_info", { "username": username },(err, result) => {
            if (err) {
                res.send("-3");
                return;
            }
            if (result.length !== 0) {
                res.send("-1");     //username is already exist
                return;
            }
            console.log("do_sign_up.js: "+ result.length);      // 0 means user is not exist
            // set up md5 encrypt
            const encrypt = md5(md5(password) + md5(password) + "Bob");
            // insert data
            db.insertOne("users_info", {
                "username": username,
                "password": encrypt,
                "avatar": "default.jpg"
            }, (err, result) => {
                if (err) {
                    res.send("-3");     // server crash
                    return;
                }
                req.session.login = "1";        // after registering successfully, write into session
                req.session.username = username;
                res.send("1");      // sign up successfully
                console.log("do_sign_up.js - req.session.username: " + req.session.username, "username: " + username);
                console.log("do_sign_up.js - req.session.login: " + req.session.login);
            });
            // if not, save it
        });
    });
};