const passport = require('passport');
const {ApiError} = require('./apiError')
const httpStatus = require('http-status')
const {roles} = require('../config/roles')


const verify= (req,res,resolve,reject,rights) => async(err,user)=>{
    if(err || !user){
        return reject (new ApiError(httpStatus.UNAUTHORIZED,'Sorry, unauthorized'))
    }
    
    if(rights.length){
        const action = rights[0] //rights
        const resource = rights[1] //route
        const permission = roles.can(user.role)[action](resource)
        if(!permission.granted){
            return reject(new ApiError(httpStatus.FORBIDDEN, "Sorry, you dont' have enough rights"))
        }

        res.locals.permission = permission;

    }

    req.user= user
    resolve()
}


const auth = (...rights) => async(req,res,next) => {
    return new Promise ((resolve, reject)=>{
        passport.authenticate('jwt',{session:false}, verify(req,res,resolve,reject, rights))(req, res, next);
    }).then(()=>next()).
    catch((err)=>next(err))
}

module.exports = auth;