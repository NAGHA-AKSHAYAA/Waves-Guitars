const  {Transaction} = require('../models/transactions')
const {User} =require('../models/user')

const paypalClient = require('../utils/paypal')
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')

const addTransaction = async(req) => {
    console.log(req.body.orderId);
    try {
        let request = new checkoutNodeJssdk.orders.OrdersGetRequest(req.body.orderId);
        let order;

        order = await paypalClient.client.execute(request) 
        if(!order || !request) throw new ApiError(httpStatus.NOT_FOUND,'Order Not Found')
        
        const transaction = new Transaction({
            userId: req.user._id,
            userEmail:req.user.email,
            orderId:req.body.orderId,
            orderData:order.result,
        })        
        await transaction.save()

        const user = await User.findOneAndUpdate({
            _id:req.user._id
        },
        {
        "$push":{
            history:[
                {
                    transactionId: transaction._id,
                    date: transaction.date,
                    orderId: req.body.orderId,
                    amount: transaction.orderData[0].purchase_units[0].amount.value,
                    items: transaction.orderData[0].purchase_units[0].items,
                }
            ]
        }},
        {new: true}
    )
    } catch (error) {
        throw error
    }
}

module.exports = {
    addTransaction
}