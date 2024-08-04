const express = require('express');
const {  getCartByUser, addProductToCart, clearCart } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authVaildator');

const cartRouter = express.Router();

cartRouter.get('/',isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, addProductToCart);

cartRouter.delete("/:id/products",isLoggedIn, clearCart);

module.exports = cartRouter;