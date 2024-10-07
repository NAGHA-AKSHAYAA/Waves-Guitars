const express = require('express');
const authRoute = require('./auth.route')
const router = express.Router();
const userRoute = require('./users.route')
const brandRoute = require('./brand.route')
const productsRoute = require('./product.route')
const routesIndex = [
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/user',
        route:userRoute
    },
    {
        path:'/brands',
        route:brandRoute
    },
    {
        path:'/product',
        route:productsRoute
    }
]

routesIndex.forEach((route)=>{
    router.use(route.path, route.route)
})



module.exports = router