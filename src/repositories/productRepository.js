const Product  = require("../schema/productSchema");

async function createProduct(productDetails){
    
    try{
        const product = await Product.create(productDetails);
    return product;
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    createProduct
}