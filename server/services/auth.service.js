const {User} = require('../models/user')
const httpStatus = require('http-status')
const {ApiError} = require('../middleware/apiError')
const userService = require('./user.service')

const creatUser = async (email, password,next) =>{
    try {
        if(await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST,"Email Already taken");
        }
        const user = new User({
            email,password
        });

        await user.save()
        return user;
    } catch (err){
        throw err
    }
}    



const genAuthToken = (user)=>{
    const token = user.generateAuthToken()
    return token
}

const signInWithEmailAndPassword = async(email, password) =>{
    try{
        const user = await userService.findUserByEmail(email)
        if(!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry BAD email')
        }
        if(!(await user.comparePassword(password))){
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid User");
        }
        return user
    }catch(err){
        throw err
    }
}


module.exports = {creatUser, genAuthToken,signInWithEmailAndPassword}