import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
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

export const wishlist = mongoose.model('wishlist' , wishlistSchema)