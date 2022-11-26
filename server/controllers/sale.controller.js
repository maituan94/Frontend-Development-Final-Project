import {
    create,
    getById,
    getAll
} from '../models/sale.model.js'

import { asyncGetById as getProductById } from '../models/product.model.js'

import { create as createOrderItem} from '../models/orderItem.model.js'

import { statusCode } from '../enum/index.js'
import { returnSaleJson } from '../helper/index.js'

export const createSale = async (req, res) => {
    const sale = req.body
    const { products, customerId } = sale
    if (!sale || !products || !customerId) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Sale' }
        })
        return
    }
    
    //@Todo: Validate customerId before create
    try {
        const orderItems = await createOrderItem(products)

        let totalAmount = 0

        for (let i = 0; i < orderItems.length; i++) {
            const productItem = await getProductById(orderItems[i].productId)
            totalAmount += productItem.salePrice * orderItems[i].quantity
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
                data: returnSaleJson(data) || {}
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

export const getSaleById = (req, res) => {
    const id = req.params?.id
    if (!id) {
        res.status(statusCode.success).json({
            statusCode: statusCode.badRequest,
            error: { message: 'Invalid Sale Id' }
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
            data: returnSaleJson(data) || {}
        })
    })
}

export const getAllSales = (req, res) => {
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
            data: data?.map(d => returnSaleJson(d)) || []
        })
    })
}