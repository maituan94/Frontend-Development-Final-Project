import { create, update, findByIdAndDelete, getAll, getById } from "../models/product.model.js"
import { updateSupplier } from "../models/supplier.model.js"
import { statusCode, duplicatedCode } from '../enum/index.js'
import { productMappingJson, productResponse } from "../helper/index.js"

/**
 * It creates a product and updates the supplier's products array with the newly created product's id
 * @param req - The request object.
 * @param res - The response object.
 */
export const createProduct = (req, res) => {
    const product = req.body

    if (!product || !product.supplierId ) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Product' }
        })
        return
    }
    
    create(productMappingJson(product), (err, data) => {
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

        updateSupplier(product.supplierId, {
            $push: {products: data._id}
        }, () => {}, { new: true, useFindAndModify: false })

        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: productResponse(data) || {}
        })
    })
}

/**
 * It updates a product in the database
 * @param req - The request object.
 * @param res - The response object.
 */
export const updateProduct = (req, res) => {
    const { id } = req.params
    const product = req.body

    if (!product || !id ) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid product' }
        })
        return
    }

    update(id, productMappingJson(product), (err, data) => {
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
            message: 'Update product successfully!',
            data: productResponse(product) || {}
        })
    })
}

/**
 * It deletes a product by its id, and then updates the supplier's products array by removing the
 * deleted product's id
 * @param req - The request object.
 * @param res - The response object.
 */
export const deleteProduct = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Product Id' }
        })
        return
    }

    findByIdAndDelete(id, (err, data) => {
        if (err) {
            console.log(err)
            res.status(statusCode.success).json({
                statusCode: statusCode.internalServerError,
                error: err
            })
            return
        }
        console.log(data)
        updateSupplier(data.supplierId, {
            $pull: {products: data._id}
        }, () => {}, { useFindAndModify: false })
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            message: 'Delete the customer successfully!'
        })
    })
}

/**
 * It gets all the products from the database and returns them to the user
 * @param req - The request object.
 * @param res - The response object.
 */
export const getAllProducts = (req, res) => {
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
            data: data?.map(d => productResponse(d)) || []
        })
    })
}

/**
 * It gets the product by id from the database and returns it to the user
 * @param req - The request object.
 * @param res - The response object that will be sent back to the client.
 * @returns The productResponse function is being returned.
 */
export const getProductById = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Product Id' }
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
            data: productResponse(data) || {}
        })
    })
}
