const {Product} = require('../models/product')
const {ApiError} = require('../middleware/apiError')
const httpStatus = require('http-status')
const { default: mongoose } = require('mongoose')

const addProduct = async (body) => {
    try {
        const product = new Product({
            ...body
        })
        await product.save();
        return product
    } catch (error) {
        throw error
    }
}


const getProductById = async(id) =>{
    try {
        const product = await Product.findById(id).populate('brand')
        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Productg not found')
            return product
    } catch (error) {
        throw error
    }
}

const updateProductById = async(_id, body) =>{
    try {
        const product = await Product.findOneAndUpdate(
            {_id},
            {"$set":{...body}},
            {new:true}
        )
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,"Product not found")
            return product
    } catch (error) {
        next(error)
    }
}

const deleteproductById = async(_id) =>{
    try {
        const product = await Product.findByIdAndDelete(_id)
        if(!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        return product
    } catch (error) {
        throw error
    }
}

const getAllProducts = async(req) => {
    try {
        const product = await Product
        .find({})
        .populate('brand');

        return product
    } catch (error) {
        throw error
    }
}

const paginateProducts = async(req) =>{
    try {

        // const example = {
        //     "keywords":"elite",
        //     "brand":["66ffba29e114ebf91f74bfa3","66ffa8834a69896cad55c9f7"],
        //     "lt":200,
        //     "gt":2000,
        //     "frets":24
        // }
        let aggQueryArray = [];

        if(req.body.keywords && req.body.keywords!=''){
            const re = new RegExp(req.body.keywords, 'gi');
            aggQueryArray.push({
                $match:{model:{$regex: re}}
            })
        }

        if(req.body.brand && req.body.brand.length>0){
            let newBrandsArray = req.body.brand.map((item)=>{
                return new mongoose.Types.ObjectId(item)
            })

            aggQueryArray.push({
                $match:{brand:{$in:newBrandsArray}}
            })
        }




        let aggQuery = Product.aggregate(aggQueryArray)
        const options = {
            page: req.body.page,
            limit: 3,
            sort:{date:`desc`}
        }

        const products = await Product.aggregatePaginate(aggQuery,options )
        return products

    } catch (error) {
        throw error
    }
}

module.exports = {
    addProduct,
     getProductById,
     updateProductById,
     deleteproductById,
     getAllProducts,
     paginateProducts
}