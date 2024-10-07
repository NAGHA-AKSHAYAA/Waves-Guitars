const { default: mongoose, mongo } = require("mongoose");
const {Brand} = require('./brand')
const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    model: {
        required:[true,'You need a guitar model'],
        type:String,
        unique:1,
        maxlength:100
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    woodtype:{
        required: true,
        type:String
    },
    frets:{
        required:true,
        type: Number
    },
    description: {
        required:[true,'You need a descripton'],
        type:String,
        maxlength:100000
    },
    price: {
        requires:true,
        type: Number,
        maxlength: 255
    },
    available:{
        type:Number,
        maxlength:500,
        default:0,
        required: [true, 'How many of this models we own'],
    },
    itemSold:{
        type:Number,
        default:0
    },
    shipping:{
        required: [true,'Specify if this product has free shipping'],
        type: Boolean,
        default: false
    },
    images:{
        type:Array,
        default:[]
    },
    date:{
        type: Date,
        default: Date.now
    },

},{timestamps:true})

const Product = mongoose.model('Product', productSchema)

module.exports = {Product}