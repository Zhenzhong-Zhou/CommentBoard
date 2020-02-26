// display edit avatar
exports.showEdit_avatar = (req, res, next) => {
    res.render("crop", {
        avatar: req.session.avatar        // send data to crop.ejs <%=avatar%>
    });
};