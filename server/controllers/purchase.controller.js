import {
    create,
    getById,
    getAll
} from '../models/purchase.model.js'

import { asyncGetById as getProductById } from '../models/product.model.js'

import { create as createOrderItem} from '../models/orderItem.model.js'

import { statusCode } from '../enum/index.js'
import { returnPurchaseJson } from '../helper/index.js'

/**
 * It creates a purchase order and returns the purchase order details
 * @param req - The request object.
 * @param res - The response object.
 */
export const createPurchase = async (req, res) => {
    const purchase = req.body
    const { products, supplierId } = purchase
    if (!purchase || !products || !supplierId) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid purhcase' }
        })
        return
    }
    
    try {
        const orderItems = await createOrderItem(products)

        let totalAmount = 0

        for (let i = 0; i < orderItems.length; i++) {
            const productItem = await getProductById(orderItems[i].productId)
            totalAmount += productItem.purchasePrice * orderItems[i].quantity
        }

        console.log('orderItems',orderItems)
        create({
            supplierId,
            totalAmount,
            orders: orderItems
        }, (err, data) => {
            if (err) {
                console.log(err)
                res.status(statusCode.success).json({
                    statusCode: statusCode.badRequest,
                    error: err
                })
                return
            }
            console.log('data',data)
            res.status(statusCode.success).json({
                statusCode: statusCode.success,
                data: returnPurchaseJson(data) || {}
            })
        })
    } catch(err) {
        console.log('error', err)
        res.status(statusCode.success).json({
            statusCode: statusCode.internalServerError,
            error: { message: err }
        })
        return
    }
}

/**
 * It gets a purchase by id
 * @param req - The request object.
 * @param res - The response object that will be sent back to the client.
 * @returns A purchase object
 */
export const getPurchaseById = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Purchase Id' }
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
            data: returnPurchaseJson(data) || {}
        })
    })
}

/**
 * It gets all the purchases from the database and returns them in a JSON format
 * @param req - The request object
 * @param res - The response object that will be sent back to the client.
 */
export const getAllPurchases = (req, res) => {
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
            data: data?.map(d => returnPurchaseJson(d)) || []
        })
    })
}