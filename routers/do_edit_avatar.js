const gm = require('gm').subClass({imageMagick: true});
const db = require("../models/db");

// do edit avatar action
exports.doEdit_avatar = (req, res, next) => {
    // this page need GET width height marginLeft marinTop
    const filename = req.session.avatar;
    const w = req.query.w;
    const h = req.query.h;
    const  x =  req.query.x;
    const  y =  req.query.y;

    gm('./avatars/' + filename).crop(w, h, x, y).resize(100, 100, "!").write('./avatars/' + filename, function (err) {
        if (err) {
            res.send("-1");
        }else {
            // change user's database - avatar
            db.updateMany("users_info",
                {
                    "username": req.session.username
                }, {
                    $set: {
                        "avatar": req.session.avatar
                    }
                }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("-1");
                }else {
                    res.send("1");
                }
            });
        }
    });
};