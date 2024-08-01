const {productService} = require("../services/productService");

async function addProduct(req, res){
   
   try{
    const product = await productService({
        productName: req.body.productName,
        description: req.body.description,
        imagePath: req.file.path,
        price: req.body.price,
        category: req.body.category, // if category is undefined, veg will be stored 
        inStock: req.body.inStock   // if inStock is undefined, true will be stored 
    })
    return res.status(201).json({
        success: true,
        message: 'successfully created the product',
        data: product,
        error: {}
    })
   } catch(err){
    console.log(err)
    return res.status(err.statusCode).json({
        success: false,
        message: error.reason,
        data: {},
        error: err
    })
   }

}
module.exports ={
    addProduct
}