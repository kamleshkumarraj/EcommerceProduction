import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
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
    pinCode : {
        type : String,
        required : [true , "Please enter pinCode for shipping."]
    },
    phoneNumber : {
        type : String,
        required : [true , "Please enter contactNo for shipping."]
    }

})

export const shippingAddress = mongoose.model('shippingAddress' , shippingAddressSchema)