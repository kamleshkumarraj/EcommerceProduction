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
        unique : [true , "slug must be unique"],
        minlength : [3 , "slug must be at least 3 characters"],
        lowercase: true, 
        trim : true,
        strict : true
    },
    image : {
        url : {
            type : String,
            required : [true , "Please enter blog image"],
        },
        publicId : {
            type : String,
            required : [true , "Please enter blog image publicId"],
        }
    },
    category : {
        type : String,
        required : [true , "Please enter blog category"],
        lowercase: true, 
        trim : true,
        enum : ["style" , "fashion" , "food" , "travel" , "culture" , "coding" , "technology" , "products" , "external" , "video" , "audio" , "music" , "games" , "movies" , "books"]
    },
    author : {
        type : mongoose.Schema.ObjectId,
        ref : 'users'
    },
    status : {
        type : String,
        required : [true , "Please enter blog status"],
        lowercase: true, 
        trim : true,
        enum : ["published" , "draft" , "deleted"],
        default : "draft"
    },
    view : {
        type : Number,
        default : 0
    },
    like : {
        type : Number,
        default : 0
    },
    comment : {
        type : Number,
        default : 0
    },
    likeStatus : {
        type : Boolean,
        default : false
    },
    viewStatus : {
        type : Boolean,
        default : false
    },
    
    comments : {
        type : mongoose.Schema.ObjectId,
        ref : 'comments'
    },
    shareCount : {
        type : Number,
        default : 0
    }
} , {timestamps : true})