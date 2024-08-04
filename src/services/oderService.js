const {clearAllProductToCart} = require("../repositories/cartRepository")
const { createNewOrder, getOrderByUserId, updateOrderStatus, getOrderById } = require("../repositories/orderRepository");
const UserRepository = require("../repositories/userRepository");
const BadRequestError = require("../utils/badRequest");
const InternalServerError = require("../utils/internalServerError");
const notFoundError = require("../utils/notFoundError");
const { getCartById } = require("../repositories/cartRepository");


async function createOrder(userId,paymentMethod){
 
    const cart = await getCartById(userId);

    const userRepo = new UserRepository();
    const user = await userRepo.findUser({_id : cart.user});

    if(!cart){
        throw new notFoundError("Cart")
    }
    if(cart.items.length === 0){
        throw new BadRequestError(["cart is empty, please add some items to the cart"]);
    }
    const orderObject = {};

    orderObject.user = cart.user;
    orderObject.status = "ORDERED";
    
    orderObject.items = cart.items.map(cartItem => {
        return {product : cartItem.product._id, qauantity : cartItem.qauantity};
    });

    orderObject.totalPrice = 0;
    
    cart.items.forEach((cartItem)=>{
        orderObject.totalPrice += cartItem.qauantity * cartItem.product.price;
    })

    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = await createNewOrder(orderObject);

    if(!order){
        throw new InternalServerError();
    }

    await clearAllProductToCart(userId);

    return order;
}

async function getAllOrderCreatedByUser(userId){
    const orders = await getOrderByUserId(userId);
    if(!orders) {
        throw new notFoundError("Oders");
    }
    return orders;
};

async function updateOrder(orderId, status){
    const order = await updateOrderStatus(orderId, status);
    if(order) {
        throw new notFoundError("Order");
    }
    return order;
};

async function getOrderCreatedByUser(userId){
    const orders = await getOrderById(userId);
    if(!orders) {
        throw new notFoundError("Oders");
    }
    return orders;
}

module.exports = {
    createOrder,
    getAllOrderCreatedByUser,
    updateOrder,
    getOrderCreatedByUser

}