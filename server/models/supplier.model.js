import mongoose from 'mongoose';
import { provinces } from '../enum/index.js';

/* Defining the schema for the customer model. */
const supplierSchema = mongoose.Schema({
    companyName: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Za-z][A-Za-z0-9 ]+$/.test(v);
            },
            message: () => 'Company Name must be more than 2 characters and not start with number or special characters'
        },
        required: [true, 'Company name is required']
    },
    phone: {
        type: String, validate: {
            validator: function (v) {
                return /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required'],
        unique: true
    },
    email: {
        type: String, validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    state: {
        type: String,
        enum: Object.keys(provinces),
        default: 'ON'
    },
    password: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v)
            },
            message: () => `Password is not valid!`
        },
        required: [true, 'Password is required']
    },
    products: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const supplierModel = mongoose.model('supplier', supplierSchema, 'Supplier')

/**
 * GetAllSuppliers is a function that takes a callback as an argument and returns all suppliers from
 * the database.
 * @param callback - The callback function that will be called when the query is complete.
 */
 export const getAllSuppliers = (callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    supplierModel.find({}, callback)
}

/**
 * GetSupplierById takes an id and a callback and returns a supplier by id.
 * @param id - The id of the supplier you want to get
 * @param callback - A function that will be called when the query is complete.
 */
export const getSupplierById = (id, callback) => {
    if (!id) throw new Error('Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    supplierModel.findById(id, callback)
}

/**
 * It creates a supplier in the database
 * @param data - The data to be inserted into the database.
 * @param callback - A function that will be called when the operation is complete.
 */
export const createSupplier = (data, callback) => {
    if (!data) throw new Error('Data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')
    supplierModel.create(data, callback)
}

/**
 * It updates a supplier's data in the database
 * @param id - The id of the supplier you want to update.
 * @param data - The data to be updated
 * @param callback - A callback function that will be called after the update is complete.
 */
export const updateSupplier = (id, data, callback) => {
    if (!data || !id) throw new Error(' Id or data is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    supplierModel.findByIdAndUpdate(id, data, callback)
}

/**
 * It deletes a supplier from the database by its id
 * @param id - The id of the supplier to be deleted.
 * @param callback - A function that will be called when the operation is complete.
 */
export const deleteSupplier = (id, callback) => {
    if (!id) throw new Error(' Id is not defined')
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    supplierModel.findByIdAndDelete(id, callback)
}

/**
 * Find one supplier in the database and return it to the callback function.
 * @param filter - This is the filter object that you want to use to find the supplier.
 * @param callback - A function that will be called when the query is complete.
 */
export const findOneSupplier = (filter, callback) => {
    if (typeof callback !== 'function') throw new Error('callback is not a function')

    supplierModel.findOne(filter, callback)
}
