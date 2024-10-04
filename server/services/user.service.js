const { User } = require("../models/user");
const {apiError} = require("../middleware/apiError")
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const findUserByEmail = async (email) => {
    return await User.findOne({email:email})
}

const findUserById = async (_id) => {
    return await User.findById(_id)
}

const updateUserProfile = async(req) => {
    try{

        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$set":{
                    ...req.body
                }
            },
            {new:true}
        )

        if(!user){
            throw apiError(httpStatus.NOT_FOUND,'User not found')
        }
        return user;
    }catch(error){
        throw error
    }
}

const updateUserEmail = async(req) =>{
    try {
        if(await User.emailTaken(req.body.newemail)){
            throw apiError(httpStatus.BAD_REQUEST,'Sorry email taken')
        }

        const user = await User.findOneAndUpdate(
            {_id: req.user._id, email:req.user.email},
            {
                "$set":{
                    email: req.body.newemail,
                    verified:false
                }
            },
            {new:true}
        )
        if(!user){
            throw apiError(httpStatus.NOT_FOUND,'User not found')
        }

        return user

    } catch (error) {
        throw error
    }
}

const validateToken = async(token) =>{
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    findUserByEmail, findUserById,updateUserProfile, updateUserEmail, validateToken
}