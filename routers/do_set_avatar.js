const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

// do set avatar action
exports.doSet_avatar = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../avatars");
    form.parse(req, (err, fields, files) => {
        console.log("do_set_avatar.js: " + files);
        const original_path = files.avatar.path;
        const  new_path = path.normalize(__dirname + "/../avatars/" + req.session.username + ".jpg");
        fs.rename(original_path, new_path, (err) => {
            if (err) {
                res.send("Failed!");
            }else {
                req.session.avatar = req.session.username + ".jpg";
                // return to edit avatar page
                res.redirect("/edit_avatar");
            }
        });
    });
};