import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    orderNumber: {
        type: Number,
        default: new Date().valueOf()
    },
    customerId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    totalAmount: {
        type: Number
    }
})
const orderModel = mongoose.model('order', customerSchema, 'Order')
