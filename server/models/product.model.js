import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Za-z][A-Za-z0-9 ]+$/.test(v);
            },
            message: () => 'Product Name must be more than 2 characters and not start with number or special characters'
        },
        required: [true, 'Product name is required']
    },
    supplierId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },

    purchasePrice: {
        type: Number,
        default: 0
    },
    salePrice: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    }
})
const productModel = mongoose.model('product', productSchema, 'Product')

/**
 * It creates a new product in the database
 * @param data - The data to be inserted into the database.
 * @param callback - A function that will be called when the operation is complete.
 */
export const create = (data, callback) => {
    if (!data) throw new Error('Data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    productModel.create(data, callback)
}

/**
 * It updates a product by its id and returns the updated product
 * @param id - The id of the product to be updated.
 * @param data - The data to be updated.
 * @param callback - The callback function that will be called after the update is complete.
 */
export const update = (id, data, callback) => {
    if (!data || !id) throw new Error(' Id or data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    productModel.findByIdAndUpdate(id, data, callback)
}

/**
 * It deletes a product by its id
 * @param id - The id of the product to be deleted.
 * @param callback - A callback function that will be called after the document is deleted.
 */
export const findByIdAndDelete = (id, callback) => {
    if (!id) throw new Error(' Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    productModel.findByIdAndDelete(id, callback)
}

/**
 * It takes an id and a callback function as parameters, and then uses the productModel to find a
 * product by its id
 * @param id - The id of the product to get
 * @param callback - A function that will be called when the query is complete.
 */
export const getById = (id, callback) => {
    if (!id) throw new Error('Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    productModel.findById(id, callback)
}

/**
 * It returns a product by id
 * @param id - The id of the product to be retrieved.
 * @returns The productModel.findById(id) is being returned.
 */
export const asyncGetById = async (id) => {
    if (!id) throw new Error('Id is not defined')
    return productModel.findById(id)
}

/**
 * GetAll is a function that takes a callback as an argument and returns all the products in the
 * database.
 * @param callback - The callback function that will be called when the query is complete.
 */
export const getAll = (callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    productModel.find({}, callback)
}

