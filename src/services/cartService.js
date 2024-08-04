const {getCartById, clearAllProductToCart} = require("../repositories/cartRepository")
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

async function modifyProductToCart(UserId, ProductId, shouldAdd = true){

    const quantityValue = shouldAdd ? + 1 :  -1;

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

        if(item.product._id == ProductId){
           if(shouldAdd){
                if(product.inStock && product.quantity > item.qauntity ){
                    item.qauntity += quantityValue;
    
                }else{
                    throw new AppError("The quantity of the item requested is not available", 404);
                }
           }else{
                if(item.qauntity > 0){
                    item.qauntity += quantityValue;
                    if(item.qauntity == 0){
                        cart.items =cart.items.filter(item => item.product._id != ProductId );
                        foundProduct = true;
                        return;
                    }
                }else{
                    throw new AppError("The quantity of the item requested is not available", 404);
                }
           }

        }
   
    foundProduct = true;
 })
  
    if(!foundProduct){
        if(shouldAdd){
           cart.items.push({
               product : ProductId,
               qauntity:1
        }) 
        }else {
            throw new notFoundError("product not found in cart"); 
        }
        }
    
       
    await cart.save();
    
    return cart
    
}

async function clearCartById(userId){
        const cart = await clearAllProductToCart(cartId);
        return cart;
}

module.exports ={
    getCart,
    modifyProductToCart,
    clearCartById
}