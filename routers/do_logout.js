// do logout action
exports.doLogout = (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }else {
                res.redirect("/");
            }
        });
    }
};