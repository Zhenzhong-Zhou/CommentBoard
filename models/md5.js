const crypto = require("crypto");
module.exports = (password) => {
    const md5 = crypto.createHash("md5");
    const encrypt = md5.update(password).digest('base64');
    return encrypt;
};