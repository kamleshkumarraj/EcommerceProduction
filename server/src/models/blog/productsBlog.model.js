import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "Please enter blog title"],
        minlength : [3 , "title must be at least 3 characters"]
    },
    content : {
        type : String,
        required : [true , "Please enter blog content"],
        minlength : [60 , "content must be at least 60 characters"]
    },
    summary : {
        type : String,
        required : [true , "Please enter blog summary"],
        minlength : [30 , "summary must be at least 30 characters"]
    },
    slug : {
        type : String,
        required : [true , "Please enter blog slug"],
        minlength : [3 , "slug must be at least 3 characters"],
        lowercase: true, 
        trim : true,
    },
    thumbnail : {
        url : {
            type : String,
            // required : [true , "Please enter blog image"],
        },
        publicId : {
            type : String,
            // required : [true , "Please enter blog image publicId"],
        }
    },
    category : {
        type : String,
        required : [true , "Please enter blog category"],
        lowercase: true, 
        trim : true,
        enum : ["products"],
    },
    subCategory : {
        type : String,
        required : [true , "Please enter blog category"],
        lowercase: true, 
        trim : true,
        
    },
    creator : {
        type : mongoose.Schema.ObjectId,
        ref : 'users',
        required : [true , "Please enter blog creator"]
    },
    status : {
        type : String,
        required : [true , "Please enter blog status"],
        lowercase: true, 
        trim : true,
        enum : ["published" , "draft" , "deleted"],
        default : "draft"
    },
    viewCount : {
        type : Number,
        default : 0
    },
    likeCount : {
        type : Number,
        default : 0
    },
    commentCount : {
        type : Number,
        default : 0
    },
    shareCount : {
        type : Number,
        default : 0
    },
    dislikeCount : {
        type : Number,
        default : 0
    },
    reactions : [{
        creator : {
            type : mongoose.Schema.ObjectId,
            ref : 'users',
            required : [true , "Please enter blog creator"]
        },
        action : {
            type : [String],
            required : [true , "Please enter blog actions"],
            enum : ["like" , "dislike" , "share" , "view" , "save" , "unsave"]
        }
    }],
    
    comments : {
        type : mongoose.Schema.ObjectId,
        ref : 'comments'
    },
    
    images : {
        type : [
            {
                publicId : {
                    type : String,
                    required : [true , "Please enter blog image publicId"],
                },
                url : {
                    type : String,
                    required : [true , "Please enter blog image url"],
                }
            }
        ],
        default : []
    }
} , {timestamps : true})

export const ProductsBlogs = mongoose.model('ProductBlog' , blogSchema)