import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer as deleteCustomerById,
    findOneCustomer
} from '../models/customer.model.js'
import {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    findOneSupplier
} from '../models/supplier.model.js'

import { userJsonReponse, userCreateUpdateJson } from '../helper/index.js'
import { statusCode, duplicatedCode } from '../enum/index.js'

dotenv.config()
const userDict = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomerById,
    findOneCustomer,
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    findOneSupplier
}

/**
 * It gets all the customers from the database and returns them in a JSON response
 * @param req - The request object.
 * @param res - The response object.
 */
const getCustomers = (req, res) => {
    getAllCustomers((err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: data?.map(d => userJsonReponse(d)) || []
        })
    })
}

/**
 * It gets a customer by ID
 * @param req - The request object.
 * @param res - The response object.
 */
const getUserById = (req, res) => {
    const id = req.params?.id
    if (!id || !req.user) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid User Id' }
        })
        return
    }

    const functionName = req.user.isSupplier ? 'getSupplierById' : 'getCustomerById'

    userDict[functionName](id, (err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: userJsonReponse(data) || {}
        })
    })
}

/**
 * It creates a new customer
 * @param req - The request object.
 * @param res - The response object.
 */
const createUser = (req, res) => {
    const user = req.body
    if (!user) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid user' }
        })
        return
    }

    const functionName = user.isSupplier ? 'createSupplier' : 'createCustomer'

    userDict[functionName](userCreateUpdateJson(user), (err, data) => {
        if (err) {
            console.log(err)
            if (err.code === duplicatedCode) {
                err = {...err, message: `${Object.keys(err.keyPattern)?.join(', ')} already existed`}
            }
            res.status(statusCode.success).json({
                statusCode: statusCode.badRequest,
                error: err
            })
            return
        }
        console.log(data)
        const secret = process.env.SECRET_JWT_TOKEN
        const expiresIn = process.env.TOKEN_EXPIRED_TIME
        let token = jwt.sign({ data: userJsonReponse(data) }, secret, {
            expiresIn
        })
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: userJsonReponse(data) || {},
            token
        })
    })
}

/**
 * It updates a customer by id, if the customer is invalid, it returns a bad request, if the customer
 * is valid, it updates the customer and returns a success message
 * @param req - The request object.
 * @param res - The response object.
 */
const updateUser = (req, res) => {
    const { id } = req.params
    const user = req.body

    if (!user || !id || !req.user) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid user' }
        })
        return
    }

    const functionName = req.user.isSupplier ? 'updateSupplier' : 'updateCustomer'

    userDict[functionName](id, userCreateUpdateJson(user), (err, data) => {
        if (err) {
            console.log(err)
            if (err.code === duplicatedCode) {
                err = {...err, message: `${Object.keys(err.keyPattern)?.join(', ')} already existed`}
            }
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            message: 'Update user successfully!',
            data: userJsonReponse(user) || {}
        })
    })

}

/**
 * It deletes a customer from the database
 * @param req - The request object.
 * @param res - The response object.
 * @returns A function that takes in two parameters, req and res.
 */
const deleteCustomer = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid User Id' }
        })
        return
    }

    deleteCustomerById(id, (err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            message: 'Delete the customer successfully!'
        })
    })
}

/**
 * It takes in a request and a response, and then it finds a customer by email and password, and if it
 * finds one, it creates a token and sends it back to the client
 * @param req - The request object.
 * @param res - The response object.
 */
const login = (req, res) => {
    const { email, password, isSupplier } = req.body
    const functionName = isSupplier ? 'findOneSupplier' : 'findOneCustomer'

    userDict[functionName]({ email, password }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        if (!data) {
            res.status(statusCode.success).json({
                statusCode: statusCode.notFound,
                message: 'Invalid Email or Password!'
            })
            return
        }
        const secret = process.env.SECRET_JWT_TOKEN
        const expiresIn = process.env.TOKEN_EXPIRED_TIME
        let token = jwt.sign({ data: userJsonReponse(data) }, secret, {
            expiresIn
        })
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: userJsonReponse(data) || {},
            token: token || null
        })
    })
}


export {
    getCustomers,
    getUserById,
    createUser,
    updateUser,
    deleteCustomer,
    login
}
