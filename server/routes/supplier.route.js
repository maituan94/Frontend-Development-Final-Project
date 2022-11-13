import express from 'express';
import { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from '../controllers/supplier.controller.js';

const SupplierRouter = express.Router();

//get suppliers
SupplierRouter.get('/suppliers', getAllSuppliers);

//create & update supplier
SupplierRouter.post('/supplier', createSupplier)
SupplierRouter.put('/supplier/:id', updateSupplier)

//get supplier by Id and delete
SupplierRouter.get('/supplier/:id', getSupplierById)
SupplierRouter.delete('/supplier/:id', deleteSupplier)

export default SupplierRouter
