const express = require('express');
const authRoute = require('./auth.route')
const router = express.Router();
const userRoute = require('./users.route')
const brandRoute = require('./brand.route')
const productsRoute = require('./product.route')
const siteRoute = require('./site.route')
const transactionRoute = require('./transaction.route')
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
    },
    {
        path:'/site',
        route:siteRoute
    },
    {
        path:'/transaction',
        route:transactionRoute
    }
]

routesIndex.forEach((route)=>{
    router.use(route.path, route.route)
})



module.exports = router