const express = require('express');
const { addProduct } = require('../controllers/product.Controller');
const uploader = require('../middleware/multerMiddleware');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage') , addProduct)

module.exports = productRouter;
