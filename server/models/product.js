const { default: mongoose, mongo } = require("mongoose");
const {Brand} = require('./brand')
const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        requires:true,
        type:String,
        unique:1,
        maxlength:100
    },
    description: {
        type:String,
        maxlength:100000
    },
    price: {
        requires:true,
        type: Number,
        maxlength: 255
    },
    brand: {
        requires:true,
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    shipping:{
        required: true,
        type: Boolean
    },
    availability:{
        type:Boolean,
        required: true,
    },
    wood:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Wood'
    },
    frets:{
        required:true,
        type: Number,
    },
    solid:{
        type:Number,
        maxlength:100,
        default: 0
    },
    publish:{
        required:true,
        type: Boolean
    },
    images:{
        type:Array,
        default:[]
    }
},{timestamps:true})

const Product = mongoose.model('Product', productSchema)

module.exports = {Product}