import express from 'express';

import { createSale, getSaleById, getAllSales } from '../controllers/sale.controller.js';

const SaleRouter = express.Router();

//get sales
SaleRouter.get('/sales', getAllSales);

//create sale
SaleRouter.post('/sale', createSale)

//get sale by Id 
SaleRouter.get('/sale/:id', getSaleById)

export default SaleRouter
