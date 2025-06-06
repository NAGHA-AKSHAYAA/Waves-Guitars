const mongoose = require('mongoose');
const validator = require('validator')

const transactionSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userEmail:{
        type:String,
        required:true,
        trime:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    orderId:{
        type:String,
        required:true,
    },
    orderData:{
        type:Array,
        required:true,
        default:[]
    },
    date:{
        type: Date,
        default:Date.now
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports={Transaction}