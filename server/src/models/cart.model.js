import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    quantity : {
        type : Number,
        default : 1
    },
    availabilityStatus : {
        type : Boolean,
        default : true
    }

})

export const cart = mongoose.model('cart' , cartSchema)