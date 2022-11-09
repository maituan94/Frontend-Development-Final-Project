import mongoose from "mongoose";
import { provinces } from "../enum/index.js";

/* Defining the schema for the customer model. */
const customerSchema = mongoose.Schema({
    companyName: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[A-Za-z][A-Za-z0-9 ]+$/.test(v);
            },
            message: () => 'Name Name must be more than 2 characters and not start with number or special characters'
        },
        required: [true, 'Name name is required']
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
    }
})