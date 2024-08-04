const {getCartById} = require("../repositories/cartRepository")
const  notFoundError  = require("../utils/notFoundError");
const { getProductById } = require("../repositories/productRepository");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequest");

async function getCart(userId) {
   const cart = await getCartById(userId);
   if(!cart) {
    throw new notFoundError("Cart")
   }
   return cart;
}

async function addToCart(UserId, ProductId){
    const cart = await getCart(UserId);
    const product = await getProductById(ProductId);
    if(!product) {
        throw new notFoundError("product");
    }
    if(!product.inStock && product.quantity < 0){
        throw new BadRequestError("Product not available in stock");
    }
    //May be in the product already in the the cart
    let foundProduct = false
    cart.items.forEach((item) =>{
        if(item.product == ProductId){
        if(product.inStock && product.quantity >= item.qauntity + 1){
            item.qauntity += 1
        }else{
            throw new AppError("The quantity of the item requested is not available", 404);
        }
        foundProduct = true;
        }
 })
  
    if(!foundProduct){
        cart.items.push({
            product : ProductId,
            qauntity:1
        })
    }
       
    await cart.save();
    
    return cart
    
}
module.exports ={
    getCart,
    addToCart
}