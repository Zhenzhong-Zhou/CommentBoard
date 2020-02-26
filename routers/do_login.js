const formidable = require("formidable");
const db = require("../models/db.js");
const md5 = require("../models/md5.js");

// do login action
exports.doLogin = (req, res, next) => {
    // get user's form
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        // after getting form, check database the user in the database or not
        const username = fields.username;
        const password = fields.password;
        const encrypt = md5(md5(password) + md5(password) + "Bob");
        console.log("do_login.js - doSign_up: " + "username: " + username + " " + "password: " + password);
        // check database: the user is in the database or not
        db.findUser("users_info", { "username": username },(err, result) => {
            if (err) {
                res.send("-5");
                return;
            }
            if (result.length === 0) {
                res.send("-1");     //username is not exist
                return;
            }
            console.log("do_login.js: "+ result.length);      // 0 means user is not exist
            // if so, check user's password, match or not
            if (encrypt === result[0].password) {
                req.session.login = "1";
                req.session.username = result[0].username;
                res.send("1");          // login successfully
                return;
            }else {
                res.send("-2");         // password is not correct
                return;
            }
            });
    });

};