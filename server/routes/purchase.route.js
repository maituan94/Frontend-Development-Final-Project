import express from 'express';

import { createPurchase, getPurchaseById, getAllPurchases } from '../controllers/purchase.controller.js';

const PurchaseRouter = express.Router();

//get purchases
PurchaseRouter.get('/purchases', getAllPurchases);

//create purchase
PurchaseRouter.post('/purchase', createPurchase)

//get purchase by Id 
PurchaseRouter.get('/purchase/:id', getPurchaseById)

export default PurchaseRouter
