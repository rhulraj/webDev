
const { createOrder, getAllOrderCreatedByUser, getOrderCreatedByUser, updateOrder } = require("../services/oderService");
const AppError = require("../utils/appError");

async function createNewOrder(req, res){

    try{
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.status(200).json({
            success: true,
            message: 'successfully created the order ',
            data: order,
            error: {}
        })
    }catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
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

async function getAllOrdersByUser(req, res){

    try{
        const order = await getAllOrderCreatedByUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'successfully created the orders ',
            data: order,
            error: {}
        })
    }catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
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

async function getOrder(req, res){

    try{
        const order = await getOrderCreatedByUser(req.user.id, req.body.paymentMethod);
        return res.status(200).json({
            success: true,
            message: 'successfully created the order ',
            data: order,
            error: {}
        })
    }catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
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

async function cancleOrder(req, res){

    try{
        const order = await updateOrder(req.body.userId, "CANCELLED" );
        return res.status(200).json({
            success: true,
            message: 'successfully Canclled the order ',
            data: order,
            error: {}
        })
    }catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
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

async function changeOrderStatus(req, res){

    try{
        const order = await updateOrder(req.params.userId, req.body.status );
        return res.status(200).json({
            success: true,
            message: 'successfully Updated the order ',
            data: order,
            error: {}
        })
    }catch(err){
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
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
    createNewOrder, 
    changeOrderStatus,
    getOrder,
    cancleOrder,
    changeOrderStatus,
    getAllOrdersByUser
}