import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo : {
        address : {
            type : String,
            required : [true , "Please enter address for shipping."]
        },
        city : {
            type : String,
            required : [true , "Please enter city for shipping."]
        },
        subDistrict : {
            type : String,
            required : [true , "Please enter subDistrict for shipping."]
        },
        district : {
            type : String,
            required : [true , "Please enter district for shipping."]
        },
        state : {
            type : String,
            required : [true , "Please enter state for shipping."]
        },
        country : {
            type : String,
            required : [true , "Please enter country for shipping."]
        },
        pincode : {
            type : String,
            required : [true , "Please enter pinCode for shipping."]
        },
        phoneNo : {
            type : String,
            required : [true , "Please enter contactNo for shipping."]
        }
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
       id : {
        type : String,
        required : true
       },
       status : {
        type : String,
        required : true
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
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    deliveredAt : {
        type : Date,
        default : Date.now()
    },
    orderStatus :{
        type : String,
        required : true,
        default : "Processing"
    }
},{timestamps : true})

export const ordersModel = mongoose.model('order',orderSchema);