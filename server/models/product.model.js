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
    unitPrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    }
})
const productModel = mongoose.model('product', supplierSchema, 'Product')
