import express from 'express'
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../controllers/customer.controller.js'

const CustomerRouter = express.Router()

//get customers
CustomerRouter.get('/customers', getCustomers);

//create & update customer
CustomerRouter.post('/customer', createCustomer)
CustomerRouter.put('/customer/:id', updateCustomer)

//get customer by Id and delete
CustomerRouter.get('/customer/:id', getCustomerById)
CustomerRouter.delete('/customer/:id', deleteCustomer)

export default CustomerRouter
