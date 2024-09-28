const { User } = require("../models/user");

require('dotenv').config();

const {Statergy: JwtStatergy, ExtractJwt} = require('passport-jwt')

const jwtOptions = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async(payload, done) => {
    try{
       const user = await User.findById(payload.sub)
       if(!user) {
        return done(null, false)
       } 
       done(null, user)
    }catch(error){
        done(error,false)
    }
}

const jwtStatergy = new JwtStatergy(jwtOptions,jwtVerify)

module.exports = {jwtStatergy}