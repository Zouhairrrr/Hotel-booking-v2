const user = require('../models/userModel')


module.exports.Authorities = (req, res, next) => {
    const authorities = [];
    for (let i = 0; i < user.role.length; i++) {
        authorities.push("ROLE_" + user.role[i].toUpperCase());
        console.log(authorities);
    }
}