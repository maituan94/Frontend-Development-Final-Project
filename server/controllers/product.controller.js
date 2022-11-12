import { create, update, findByIdAndDelete, getAll, getById } from "../models/product.model.js"
import { updateSupplier } from "../models/supplier.model.js"
import { statusCode, duplicatedCode } from '../enum/index.js'
import { productMappingJson, productResponse } from "../helper/index.js"

export const createProduct = (req, res) => {
    const product = req.body

    if (!product || !product.supplierId ) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Product' }
        })
        return
    }

    //@To-do: verify supplier first
    
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
