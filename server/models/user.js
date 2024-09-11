const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { SanitizersImpl } = require("express-validator/lib/chain");
const { JsonWebTokenError } = require("jsonwebtoken");
const SALT = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim:true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlenfth: 5
    },
    name:{
        type : String,
        required: true,
        maxlength: 100
    },
    cart:{
        type: Array,
        default:[]
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
});

userSchema.pre('save',function (next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)
               
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        
            })
        })
    }else{
        next()
    }
    
})


userSchema.methods.comparePassword = function(canditatePassword,cb){
    bcrypt.compare(canditatePassword,this.password,function (err, isMatch) {
        if(err) return cb(err);
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET)
    user.token = token;
    user.save().then(()=>{
        cb(null,user)
    }).catch(()=>{
        cb(err)
    })
}

userSchema.statics.findByToken = function(token,cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET, function(err, decode){
        user.findOne({"_id":decode, "token":token}).then((userFound)=>{
            cb(null,userFound)
        }).catch(()=>{
            cb(err)
        })
    })
}


const User = mongoose.model('User',userSchema)
module.exports = {User}