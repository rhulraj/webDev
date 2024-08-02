const express = require('express');
const { addProduct, findProduct, DeleteProduct } = require('../controllers/product.Controller');
const uploader = require('../middleware/multerMiddleware');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage') , addProduct)
productRouter.get('/:id', findProduct);
productRouter.delete('/:id',DeleteProduct);


module.exports = productRouter;
