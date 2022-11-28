import mongoose from 'mongoose';

const purchaseSchema = mongoose.Schema({
    supplierId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    purchaseDate: {
        type: Date,
        default: Date.now()
    },
    orders: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'orderItem'
        }
    ],
    totalAmount: {
        type: Number
    }
})
const purchaseModel = mongoose.model('purchase', purchaseSchema, 'Purchase')

/**
 * It creates a new product in the database
 * @param data - The data to be inserted into the database.
 * @param callback - A function that will be called when the operation is complete.
 */
 export const create = (data, callback) => {
    if (!data) throw new Error('Data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    purchaseModel.create(data, callback)
}

/**
 * It takes an id and a callback function as parameters, and then uses the purchaseModel to find a
 * product by its id
 * @param id - The id of the product to get
 * @param callback - A function that will be called when the query is complete.
 */
export const getById = (id, callback) => {
    if (!id) throw new Error('Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    purchaseModel.findById(id, callback).populate("orders")
}

/**
 * GetAll is a function that takes a callback as an argument and returns all the products in the
 * database.
 * @param callback - The callback function that will be called when the query is complete.
 */
export const getAll = (callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    purchaseModel.find({}, callback).populate("orders")
}