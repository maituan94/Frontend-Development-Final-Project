import {
    create,
    getById,
    getAll
} from '../models/purchase.model.js'

import { asyncGetById as getProductById } from '../models/product.model.js'

import { create as createOrderItem} from '../models/orderItem.model.js'

import { statusCode } from '../enum/index.js'
import { returnPurchaseJson } from '../helper/index.js'

export const createPurchase = async (req, res) => {
    const purchase = req.body
    const { products, customerId } = purchase
    if (!purchase || !products || !customerId) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid purhcase' }
        })
        return
    }
    
    //@Todo: Validate customerId before create
    try {
        const orderItems = await createOrderItem(products)

        let totalAmount = 0

        for (let i = 0; i < orderItems.length; i++) {
            const productItem = await getProductById(orderItems[i].productId)
            totalAmount += productItem.purchasePrice * orderItems[i].quantity
        }

        console.log('orderItems',orderItems)
        create({
            customerId,
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