const { getCart, modifyProductToCart, clearCartById,  } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req, res) {
    try{
        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the cart",
            erroe: {},
            data: cart
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
async function addProductToCart(req, res){
    try{
        const cart = await modifyProductToCart(req.user.id, req.params.productId, req.params.operation === "add");
        return res.status(200).json({
            success: true,
            message: 'successfully added product to cart ',
            data: cart,
            error: {}
        })
    }catch(err){
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

async function clearCart(req, res){
    try{
        const response = await clearCartById(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'successfully added product to cart ',
            data: response,
            error: {}
        })
    }catch(err){
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
module.exports = {
    getCartByUser, 
    addProductToCart,
    clearCart
}