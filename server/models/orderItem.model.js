import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
    orderId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    productId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    }
})

const orderItemModel = mongoose.model('orderItem', orderItemSchema, 'OrderItem')