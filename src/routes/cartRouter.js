const express = require('express');
const {  getCartByUser, addProductToCart } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authVaildator');

const cartRouter = express.Router();

cartRouter.get('/',isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, addProductToCart);

module.exports = cartRouter;