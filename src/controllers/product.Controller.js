const {productService, getProductById, deleteProductById} = require("../services/productService");
const AppError = require("../utils/appError");

async function addProduct(req, res){
   
   try{
    const product = await productService({
        productName: req.body.productName,
        description: req.body.description,
        imagePath: req.file?.path,
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
    if(err instanceof AppError) {
    return res.status(err.statusCode).json({
        success: false,
        message: err.reason,
        data: {},
        error: err
    })
    }
    console.log(err)
    return res.status(500).json({
        success: false,
        message: err.reason,
        data: {},
        error: err
    })
   }

}

async function findProduct(req, res){
    const id = req.params.id;
    try{
        const product = await getProductById(id);
        return res.status(200).json({
            success: true,
            message: 'successfully get the product',
            data: product,
            error: {}
        })
       } catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.reason,
                data: {},
                error: err
        })
    }
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: err
        
    })
}
}
async function DeleteProduct(req, res){
    const id = req.params.id;
    try{
        const product = await deleteProductById(id);
        return res.status(200).json({
            success: true,
            message: 'successfully deteted the product',
            data: {},
            error: {}
        })
       } catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err,
                data: {},
                error: err
        })
    }
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: err
        
    })
}
}
module.exports ={
    addProduct,
    findProduct, 
    DeleteProduct
}