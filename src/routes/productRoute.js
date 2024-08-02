const express = require('express');
const { addProduct, findProduct, DeleteProduct } = require('../controllers/product.Controller');
const uploader = require('../middleware/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation/authVaildator');

const productRouter = express.Router();

productRouter.post(
    '/',
    isLoggedIn,
    isAdmin, 
    uploader.single('productImage'),
    addProduct);

productRouter.get('/:id', findProduct);
productRouter.delete('/:id',DeleteProduct);


module.exports = productRouter;
