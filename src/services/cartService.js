const {getCartById} = require("../repositories/cartRepository")
const  notFoundError  = require("../utils/notFoundError");

async function getCart(userId) {
   const cart = await getCartById(userId);
   if(!cart) {
    throw new notFoundError("Cart")
   }
   return cart;
}
module.exports ={
    getCart,
}