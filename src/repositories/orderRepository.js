const Order = require("../schema/orderSchema");
const BadRequestError = require("../utils/badRequest");
const InternalServerError = require("../utils/internalServerError");

async function createNewOrder(orderDetails){
    try{
        const order = await Order.create(orderDetails);
        return order;

    }catch( error){
        if(error.name === 'ValidationError'){
            const errorMessagelist= Object.keys(error.errors).map((property) => {
               return error.errors[property].message;
             })
             throw new BadRequestError(errorMessagelist);
         }
         console.log(error);
         throw new InternalServerError();
    }
}

async function getOrderByUserId(userId){
    try{
        const orders = await Order.find({user : userId}).populate('items.product');
        return orders;
    }catch(error){
        console.log(error);
        throw new InternalServerError()
    }
}

async function getOrderById(orderId){
    try{
        const orders = await Order.findById(orderId).populate('items.product');
        return orders;
    }catch(error){
        console.log(error);
        throw new InternalServerError()
    }
}

async function updateOrderStatus(orderId, status){
    try{
        const order = await Order.findByIdAndUpdate(orderId, {status: status}, {new: true});
        return order;
    } catch(error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createNewOrder,
    getOrderById,
    getOrderByUserId,
    updateOrderStatus
}