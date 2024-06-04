const mongoose = require('momgoose')
const validator = require('validator');
require('dotenv').config();

const userSchema = mongoose.Schema({
    email :{
        type:String,
        require:true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type: String,
        require: true,
        trim:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    firstname:{
        type:String,
        maxLength: 100,
        trim: true,
        default:''
    },
    lastname:{
        type:String,
        maxLength: 100,
        trim: true,
        default:''
    },
    cart:{
        type: Array,
        default:[]
    },
    history:{
        type: Array,
        default:[]
    },
    verified:{
        type: Boolean,
        default: false
    },
})

const User = mongoose.model('User',userSchema)
module.exports = {User}