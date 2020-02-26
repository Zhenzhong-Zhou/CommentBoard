const db = require("../models/db.js");

// display all twitters
exports.list_all_twitters = (req, res, next) => {
    // get a data: page
    let page = req.query.page;
    db.findData("messages", {},{"page_amount": 10, "page": page, "sort": {"datetime": -1}}, (err, result) => {
        console.log("########################## Start: ##########################\n\n");
        console.log(result);
        console.log("########################## End: ##########################\n\n");
        // res.json({"results": result});
        res.json(result);
    })
};