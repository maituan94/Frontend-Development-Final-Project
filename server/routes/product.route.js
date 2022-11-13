import express from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById } from '../controllers/product.controller.js';

const ProductRouter = express.Router();

//create product
ProductRouter.post('/product', createProduct);

//get route
ProductRouter.get('/products', getAllProducts);

//update product
ProductRouter.put('/product/:id', updateProduct)

//delete product
ProductRouter.delete('/product/:id', deleteProduct)

//get product by id
ProductRouter.get('/product/:id', getProductById)
export default ProductRouter
