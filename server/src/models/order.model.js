import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo : {
        type : mongoose.Schema.ObjectId,
        ref : "shippingAddress"
    },
    orderItems : [{
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true 
        },
        image : {
            type : String,
            required : true
        },
        quantity : {
            type : String,
            required : true
        },
        productId : {
            type : mongoose.Schema.ObjectId,
            ref : "product",
            required : true
        }
    }],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true
    },
    paymentInfo : {
        razorpay_order_id : {
        type : String,
       },
       status : {
        type : String,
       },
        razorpay_payment_id : {
            type: String
        },
        razorpay_signature :{
            type : String
        }
       

    },
    paidAt : {
        type : Date,
        required : true,
        default : Date.now()
    },
    itemsPrice : {
        type : Number,
        required : true
    },
    taxPrice : {
        type : Number,
        required : true
    },
    shippingPrice : {
        type : Number,
        required : true,
        default : 0
    },
    totalPrice : {
        type : Number,
        required : true
    },
    deliveredAt : {
        type : Date,
        default : Date.now()
    },
    paymentMethod : {
        type : String,
        required : true
    },
    orderStatus : {
        type : String,
        required : true,
        enum : ['pending' , 'cancelled' , 'delivered', 'shipping' , 'out for delivery' , 'confirmed'],
        default : "pending"
    }
},{timestamps : true})

export const ordersModel = mongoose.model('order',orderSchema);