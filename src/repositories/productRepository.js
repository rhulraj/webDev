const Product  = require("../schema/productSchema");
const BadRequestError = require("../utils/badRequest");
const InternalServerError = require("../utils/internalServerError");

async function createProduct(productDetails){
    
    try{
        const product = await Product.create(productDetails);
    return product;
    } catch (error){
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

async function getProductById(productId){
    try{
        const product = await Product.findById(productId);
        return product;
    }catch (error){
        console.log(error);
        throw new InternalServerError();
    }
}

async function deleteProductById(productId){
    try{
        const response = await Product.findByIdAndDelete(productId);
        return response;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createProduct,
    getProductById, 
    deleteProductById
}