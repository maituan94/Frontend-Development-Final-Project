import express from 'express';
import { getCustomers, createUser, login, getUserById, updateUser, deleteCustomer } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/authJWT.js';

const CustomerRouter = express.Router();

//login
CustomerRouter.post('/user/login', login)

//get customers
CustomerRouter.get('/customers', [verifyToken], getCustomers);

//create & update customer
CustomerRouter.post('/user', createUser)
CustomerRouter.put('/user/:id', [verifyToken], updateUser)

//get customer by Id and delete
CustomerRouter.get('/user/:id', [verifyToken], getUserById)
CustomerRouter.delete('/customer/:id', [verifyToken], deleteCustomer)

export default CustomerRouter
