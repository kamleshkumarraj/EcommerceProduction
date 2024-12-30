import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { removeFile, removeMultipleFileFromCloudinary, uploadMultipleFilesOnCloudinary } from "../../helper/helper.js";
import { blogs } from "../../models/blog/blog.model.js";
import { comments } from "../../models/blog/comments.models.js";
import { v4 as uuidv4 } from 'uuid'

export const createBlog = asyncHandler(async (req , res , next) =>{
   
    req.body = req.body.map((body) => {
        body["images"] = body.images.map((image) => {
            return {
                publicId : uuidv4() ,
                url : image
            }
        }) 
        body["thumbnail"] = {
            publicId : uuidv4() , url : body.thumbnail} 
            
        body["creator"] = req?.user?._id
        return body
    })
    // const thumbnail ={publicId : uuidv4() , url : req.body.thumbnail} 
    await blogs.create(req.body);

    res.json({
        success : true,
        message : "Blog created successfully",  
    })

    // const thumbnailData = req?.files?.thumbnail || []
    // const imagesData = req?.files?.images || []

    // // if user provide images but not thumbnail, then we will take the first image as thumbnail
    // if(thumbnailData.length == 0) {
    //     if(imagesData.length > 0){
    //         thumbnailData.push(imagesData[0])
    //         imagesData.shift()
    //     }else return next(new ErrorHandler("Please provide at least one image", 400))
    // }

    // // now we upload the thumbnail and images to cloudinary
    // const thumbnailResult = await uploadMultipleFilesOnCloudinary(thumbnailData)
    // if(thumbnailResult?.success == false) return next(new ErrorHandler(thumbnailResult.error, 400))
    
    // // and then we get the publicId and url of the thumbnail and images for saving in the database
    // const thumbnail = {
    //     publicId : thumbnailResult.results[0]?.publicId,
    //     url : thumbnailResult.results[0]?.url
    // }
    // // now we remove the thumbnail file from the server
    // await removeFile(thumbnailData)

    // let images = [];

    // // if user provide images, then we will upload them to cloudinary and save the publicId and url in the database
    // if(imagesData.length > 0){
    //     const imageResult = await uploadMultipleFilesOnCloudinary(imagesData)
    //     if(imageResult?.success == false) return next(new ErrorHandler(imageResult.error, 400))

    //     images = imageResult.results.map((image) => {
    //         return {
    //             publicId : image.publicId,
    //             url : image.url
    //         }
    //     })
    //     await removeFile(imagesData)
    // }
    
    // // now we create the blog in the database
    // await blogs.create({title , content , summary , slug , category, thumbnail, images , creator : req?.user?._id})

    // res.status(201).json({
    //     success : true,
    //     message : "Blog created successfully",
    //     data : {
    //         title , content , summary , slug , category, thumbnail, images
    //     }
    // })

})

export const getMyBlogs = asyncHandler(async (req , res , next) => {
    const blogsData = await blogs.find({creator : req?.user?._id})

    res.status(200).json({
        success : true,
        message : "You get all blogs that you created",
        data : blogsData
    })
})

export const getAllBlogs = asyncHandler(async (req , res , next) => {
    const blogData = await blogs.find();

    res.status(200).json({
        success : true,
        message : "You get all blogs successfully",
        data : blogData
    })
})

export const createComment = asyncHandler(async (req , res , next) => {
    const {blogId} = req.params;
    const {message} = req.body;

    const blog = await blogs.findById(blogId);
    if(!blog) return next(new ErrorHandler("Blog not found", 404))

    await comments.create({comment : {message} , blogId , creator : req?.user?._id })

    res.status(201).json({
        success : true,
        message : "Comment created successfully",
    })
})

export const getCommentsForABlog = asyncHandler(async (req , res , next) => {
    const {blogId} = req.params;
    const commentsData = await comments.find({blogId});

    res.status(200).json({
        success : true,
        message : "You get all comments successfully",
        data : commentsData
    })
})

export const replyBlogComment = asyncHandler(async (req , res , next) => {
    const {commentId} = req.params;
    const {message} = req.body;
    const commentData = await comments.findById(commentId);

    if(!commentData) return next(new ErrorHandler("Comment not found", 404))

    // check if the user is the already replying.

    const existComment = commentData.comment.reply.find((reply) => reply.creator.toString() === req?.user?._id.toString())

    if(existComment) existComment.message.push(message)

    else commentData.comment.reply.push({message : [message] , creator : req?.user?._id})

    await commentData.save();

    res.status(201).json({
        success : true,
        message : "Reply created successfully",
    })
})

export const createReactions = asyncHandler(async (req , res , next) => {
    const {blogId} = req.params;
    const {type} = req.query;
    if(!type) return next(new ErrorHandler("Please provide the type of reaction", 400))

    const blog = await blogs.findById(blogId);

    if(!blog) return next(new ErrorHandler("Blog not found", 404))

    const existingReactions = blog.reactions.find((reaction) => reaction.creator.toString() == req?.user?._id.toString())

    if(type == 'unsave' || type == 'unlike'){
        if(!existingReactions) return next(new ErrorHandler("You have not reacted to this blog yet", 400))
        existingReactions.action.splice(existingReactions.action.indexOf(type), 1)
        if(type == 'unlike') blog.likeCount -= 1;
       

        await blog.save();
        return res.status(200).json({
            success : true,
            message : `You have removed ${type} reaction from this blog`
        })
    }

    if(existingReactions) existingReactions.action.push(type);
    
    else blog.reactions.push({creator : req?.user?._id , action : type})

    switch(type){
        case "like":
            blog.likeCount += 1;
            break;
        case "share":
            blog.shareCount += 1;
            break;
        case "view":
            blog.viewCount += 1;
            break;
       
    }


})

export const getAllActionBlog = asyncHandler(async (req , res , next) => {
    const action = req.query.action;
    if(!action) return next(new ErrorHandler("Please provide the action type", 400))

     // if the action is history, then we will get all the blogs that the user has viewed
    const actionType = ['like' , 'save' , 'history' , 'share']
    if(!actionType.includes(action)) return next(new ErrorHandler("Please provide the correct action type", 400))

    const savedBlog = await blogs.find({reactions : { $elemMatch : { creator : req?.user?._id , action : action == 'history' ? "view" : action } } })

    res.status(200).json({
        success : true,
        message : "You get all saved blogs successfully",
        data : savedBlog
    })
})

export const deleteBlog = asyncHandler(async (req , res , next) => {
    const {blogId} = req.params;
    const deletedBlog = await blogs.findByIdAndDelete(blogId);

    const thumbnail = deletedBlog.thumbnail;
    const images = deletedBlog.images;

    const status = await removeMultipleFileFromCloudinary([thumbnail , ...images])
    if(status.success == false) return next(new ErrorHandler(status.error, 400))

    res.status(200).json({
        success : true,
        message : "Blog deleted successfully"
    })
})

export const getCategoryBlog = asyncHandler(async (req , res , next) => {
    const {category} = req.params; 
    if(!category) return next(new ErrorHandler("Please provide the category", 400))
    const blogData = await blogs.find({category})
    res.status(200).json({
        success : true,
        message : "You get all blogs for this category successfully",
        data : blogData
    })
})



