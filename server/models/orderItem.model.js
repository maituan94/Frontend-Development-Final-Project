import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
    productId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    }
})

const orderItemModel = mongoose.model('orderItem', orderItemSchema, 'OrderItem')

/**
 * It creates a new product in the database
 * @param data - The data to be inserted into the database.
 * @param callback - A function that will be called when the operation is complete.
 */
 export const create = async (data) => {
    if (!data) throw new Error('Data is not defined')
    let orderItems = []
    try {
        orderItems = await orderItemModel.create(data)
        return orderItems
    } catch (error) {
        throw error
    }
}

/**
 * It takes an id and a callback function as parameters, and then uses the orderItemModel to find a
 * product by its id
 * @param id - The id of the product to get
 * @param callback - A function that will be called when the query is complete.
 */
export const getById = (id, callback) => {
    if (!id) throw new Error('Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    orderItemModel.findById(id, callback)
}

/**
 * GetAll is a function that takes a callback as an argument and returns all the products in the
 * database.
 * @param callback - The callback function that will be called when the query is complete.
 */
export const getAll = (callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    orderItemModel.find({}, callback)
}