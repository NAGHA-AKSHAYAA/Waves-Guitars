const { default: mongoose } = require("mongoose");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { SanitizersImpl } = require("express-validator/lib/chain");
const { JsonWebTokenError } = require("jsonwebtoken");
const SALT = 10;


const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim:true,
        unique: 1,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlenfth: 5
    },
    firstname:{
        type : String,
        maxLength: 100,
        trim: true,
        default:''
    },
    lastname:{
        type : String,
        maxLength: 100,
        trim: true,
        default:''
    },
    cart:{
        type: Array,
        default:[]
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    token:{
        type:String
    },
    history:{
        type:Array,
        default:[]
    },
    verified:{
        type:Boolean,
        default: false
    }
});

userSchema.pre('save', function (next) {
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

userSchema.statics.emailTaken = async function (email) {
    const user = await this.findOne({email})
    return !!user
}

userSchema.methods.comparePassword = async function(canditatePassword,cb){

    const user = this;
    ismatch = await bcrypt.compare(canditatePassword,user.password)
    return ismatch;
    
}

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var token = jwt.sign({sub:user._id.toHexString()},process.env.SECRET,{expiresIn:"1d"})
    return token
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