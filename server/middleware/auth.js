const {User} = require('./../models/user');

let auth = (req, res, next) => {
    let token = res.cookies.w_auth;

    User.findByToken(token,(err,user)=>{
        
    })
}


module.exports = {auth}