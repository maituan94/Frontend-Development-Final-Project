import {
    getAllSuppliers as getAll,
    getSupplierById as getById,
    createSupplier as create,
    updateSupplier as update,
    deleteSupplier as deleteSupplierById
} from '../models/supplier.model.js'

import { supplierJsonReponse, supplierCreateUpdateJson } from '../helper/index.js'
import { statusCode, duplicatedCode } from '../enum/index.js'


/**
 * It gets all the customers from the database and returns them in a JSON response
 * @param req - The request object.
 * @param res - The response object.
 */
const getAllSuppliers = (req, res) => {
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
            data: data?.map(d => supplierJsonReponse(d)) || []
        })
    })
}

/**
 * It gets a customer by ID
 * @param req - The request object.
 * @param res - The response object.
 */
const getSupplierById = (req, res) => {
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
            data: supplierJsonReponse(data) || {}
        })
    })
}

/**
 * It creates a new customer
 * @param req - The request object.
 * @param res - The response object.
 */
const createSupplier = (req, res) => {
    const user = req.body
    if (!user) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid user' }
        })
        return
    }

    create(supplierCreateUpdateJson(user), (err, data) => {
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
            data: supplierJsonReponse(data) || {}
        })
    })
}

/**
 * It updates a customer by id, if the customer is invalid, it returns a bad request, if the customer
 * is valid, it updates the customer and returns a success message
 * @param req - The request object.
 * @param res - The response object.
 */
const updateSupplier = (req, res) => {
    const { id } = req.params
    const supplier = req.body

    if (!supplier || !id ) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid supplier' }
        })
        return
    }

    update(id, supplierCreateUpdateJson(supplier),(err, data) => {
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
            message: 'Update supplier successfully!',
            data: supplierJsonReponse(supplier) || {}
        })
    }, {})

}

/**
 * It deletes a customer from the database
 * @param req - The request object.
 * @param res - The response object.
 * @returns A function that takes in two parameters, req and res.
 */
const deleteSupplier = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid User Id' }
        })
        return
    }

    deleteSupplierById(id, (err, data) => {
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
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
}
