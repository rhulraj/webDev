const {createProduct} = require("../repositories/productRepository")
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs/promises');

async function productService(productDetails){
    //1. we shoudcheck if an image is coming to create the product, then weshould first upload it on
    //cloudinary
    const imagePath = productDetails.imagePath;
    if(imagePath){
        try{
            const response = await cloudinary.uploader.upload(imagePath);
            var ProductImage = response.secure_url;
            await fs.unlink(imagePath)
        } catch(err){
            console.log(err)
            throw { reason: 'Not able to create product', statusCode: 500};
        }
    }

      //2. Then use the url from cloudinary and other product details to add product in db
      const product = await createProduct({
        ...productDetails,
        prductImage: ProductImage
      });

      if(!product){
        throw { reason: 'Not able to create product', statusCode: 500};
      }
      return product;
}

module.exports = {
    productService
}