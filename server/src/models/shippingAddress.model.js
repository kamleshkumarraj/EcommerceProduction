import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    firstname : {
        type : String,
        required : [true , "Please enter customerName for shipping."]
    },
    lastname : {
        type : String,
        required : [true , "Please enter customerName for shipping."]
        
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
        type : Number,
        required : [true , "Please enter pinCode for shipping."]
    },
    mobileNumber : {
        type : Number,
        required : [true , "Please enter contactNo for shipping."]
    },
    selectStatus : {
        type : Boolean,
        default : false
    }

})

export const shippingAddress = mongoose.model('shippingAddress' , shippingAddressSchema)