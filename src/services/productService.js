const productRepository = require("../repositories/productRepository")
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs/promises');
const InternalServerError = require("../utils/internalServerError");
const notFoundError = require("../utils/notFoundError");
const { response } = require("express");

async function productService(productDetails){
    //1. we shoudcheck if an image is coming to create the product, then weshould first upload it on
    //cloudinary
    const imagePath = productDetails.imagePath;
    console.log(imagePath)
    if(imagePath){
        try{
            const response = await cloudinary.uploader.upload(imagePath);
            console.log(response)
            var ProductImage = response.secure_url;
            await fs.unlink(process.cwd() +  "/" + imagePath);
        } catch(err){
            console.log(err)
            throw new InternalServerError()
        }
    }
      //2. Then use the url from cloudinary and other product details to add product in db
      const product = await productRepository.createProduct({
        ...productDetails,
        prductImage: ProductImage
      });
    console.log(product)
      return product;
}

async function getProductById(productId){
    const product = await productRepository.getProductById(productId)
    if(!product){
        throw new notFoundError("Product");
    }
    return product;
}


async function deleteProductById(productId){
    const response = await productRepository.deleteProductById(productId)
    if(!response){
        throw new notFoundError("Product");
    }
    return response;
}

module.exports = {
    productService, 
    getProductById,
    deleteProductById
}