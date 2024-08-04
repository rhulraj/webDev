const express = require("express");
const { createNewOrder, getAllOrdersByUser, getOrder, cancleOrder, changeOrderStatus } = require("../controllers/orderContoller");
const {isLoggedIn, isAdmin} = require("../validation/authVaildator");


const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createNewOrder);
orderRouter.get('/', isLoggedIn, getAllOrdersByUser);
orderRouter.get('/:id', isLoggedIn, getOrder);
orderRouter.put('/:orderId/cancel', isLoggedIn, cancleOrder);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin, changeOrderStatus);

module.exports = orderRouter;