import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type : String,
            required : true,
        },
        description: {
            type : String,
            required : true,
        },
        category: {
            type : String,
            required : true,
        },
        price : {
            type : Number,
            required : true
        },
        discountPercentage: {
            type : Number,
            default : 0
        },
        rating : {
            type : Number,
            default : 0
        },
        stock: {
            type : Number,
            required : true,
        },
        
        brand: {
            type : String,
        },
        warrantyInformation: {
            type : String,
            required : true,
        },
        shippingInformation: {
            type : String,
            required : true,
        },
        availabilityStatus: {
            type : String,
            required : true
        },
        reviews: [
          {
            rating: {
                type : Number,
                default : 0
            },
            comment: {
                type : String,
                
            },
            date: {
                type : Date,
                default : Date.now()
            },
            reviewerId: {
                type : mongoose.Schema.ObjectId,
                ref : "usersModels"
            },
          }
        ],
        returnPolicy: {
            type : String,
            required : true
        },
        minimumOrderQuantity: {
            type : Number,
            default : 1,
        },
        images: [],
        thumbnail: {
            type : String,
            required : true
        }
    }     
,{timestamps : true})

export const productsModel = mongoose.model('product' , productSchema) 