const Cart = require("../schema/cartSchema");
const BadRequestError = require("../utils/badRequest");
const InternalServerError = require("../utils/internalServerError");
const notFoundError = require("../utils/notFoundError");

async function createcart(userId){
    try{
        const newCart = await Cart.create({
              user: userId
        });
        return newCart;
    }catch(error) {
        if(error.name === "ValidationError"){
            const errorMessageList = Object.keys(error.errors).map((property) =>{
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError()
    }
};

async function getCartById(userId){
    try{
        const cart = await Cart.findOne({
            user : userId
        }).populate("items.product");
        return cart;
    }catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
};

async function clearAllProductToCart(userId){
    try{
        const cart = await Cart.findOne({
            user: userId
        });
        if(!cart){
            throw new notFoundError("Cart")
        }

        cart.items = [];

        await cart.save();

        return cart;
   } catch (error){
    throw new InternalServerError();
   }
}

module.exports = {
    createcart,
    getCartById, 
    clearAllProductToCart
}