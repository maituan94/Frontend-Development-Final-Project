import {
    getAllCustomers as getAll,
    getCustomerById as getById,
    createCustomer as create,
    updateCustomer as update,
    deleteCustomer as deleteCustomerById
} from '../models/customer.model.js'

import { customerJsonReponse, customerCreateUpdateJson } from '../helper/index.js'
import { statusCode, duplicatedCode } from '../enum/index.js'

/**
 * It gets all the customers from the database and returns them in a JSON response
 * @param req - The request object.
 * @param res - The response object.
 */
const getCustomers = (req, res) => {
    getAll((err, data) => {
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
            data: data?.map(d => customerJsonReponse(d)) || []
        })
    })
}

/**
 * It gets a customer by ID
 * @param req - The request object.
 * @param res - The response object.
 */
const getCustomerById = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid User Id' }
        })
        return
    }

    getById(id, (err, data) => {
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
            data: customerJsonReponse(data) || {}
        })
    })
}

/**
 * It creates a new customer
 * @param req - The request object.
 * @param res - The response object.
 */
const createCustomer = (req, res) => {
    const user = req.body
    if (!user) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid user' }
        })
        return
    }

    create(customerCreateUpdateJson(user), (err, data) => {
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
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: customerJsonReponse(data) || {}
        })
    })
}

/**
 * It updates a customer by id, if the customer is invalid, it returns a bad request, if the customer
 * is valid, it updates the customer and returns a success message
 * @param req - The request object.
 * @param res - The response object.
 */
const updateCustomer = (req, res) => {
    const { id } = req.params
    const user = req.body

    if (!user || !id ) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid user' }
        })
        return
    }

    update(id, customerCreateUpdateJson(user), (err, data) => {
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
            data: customerJsonReponse(user) || {}
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

export {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}
