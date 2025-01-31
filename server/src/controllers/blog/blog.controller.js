import { asyncHandler } from "../../errors/asynHandler.js";
import ErrorHandler from "../../errors/errorHandler.js";
import { blogFindQuery, removeFile, removeMultipleFileFromCloudinary, uploadMultipleFilesOnCloudinary } from "../../helper/helper.js";
import { blogs } from "../../models/blog/blog.model.js";

export const createBlog = asyncHandler(async (req , res , next) =>{
    const thumbnailData = req?.files?.thumbnail || []
    const imagesData = req?.files?.images || []
    
    //we extract the all properties from the request body
    const {title , content , summary , slug , category} = req.body
    // if user provide images but not thumbnail, then we will take the first image as thumbnail
    if(thumbnailData.length == 0) {
        if(imagesData.length > 0){
            thumbnailData.push(imagesData[0])
            imagesData.shift()
        }else return next(new ErrorHandler("Please provide at least one image", 400))
    }

    // now we upload the thumbnail and images to cloudinary
    const thumbnailResult = await uploadMultipleFilesOnCloudinary(thumbnailData)
    if(thumbnailResult?.success == false) return next(new ErrorHandler(thumbnailResult.error, 400))
    
    // and then we get the publicId and url of the thumbnail and images for saving in the database
    const thumbnail = {
        publicId : thumbnailResult.results[0]?.public_id,
        url : thumbnailResult.results[0]?.url
    }
    // now we remove the thumbnail file from the server
    await removeFile(thumbnailData)

    let images = [];

    // if user provide images, then we will upload them to cloudinary and save the publicId and url in the database
    if(imagesData.length > 0){
        const imageResult = await uploadMultipleFilesOnCloudinary(imagesData)
        if(imageResult?.success == false) return next(new ErrorHandler(imageResult.error, 400))

        images = imageResult.results.map((image) => {
            return {
                publicId : image.public_id,
                url : image.url
            }
        })
        await removeFile(imagesData)
    }
    
    // now we create the blog in the database
    const blog = await blogs.create({title , content , summary , slug , category, thumbnail, images , creator : req?.user?._id})

    res.status(201).json({
        success : true,
        message : "Blog created successfully",
        data : blog
    })

})

export const getMyBlogs = asyncHandler(async (req , res , next) => {
    const {limit = 20, page = 1} = req.query;
    const skip = (page - 1) * limit;
    const blogsData = await blogs.aggregate(
        blogFindQuery({matchQuery : {creator : req?.user?._id}, limit , skip})
    )

    res.status(200).json({
        success : true,
        message : "You get all blogs that you created",
        data : blogsData
    })
})

export const getAllBlogs = asyncHandler(async (req , res , next) => {
    const {page = 1, limit=20} = req.query;
    const skip = (page - 1) * limit;
    const blogData = await blogs.aggregate(
        blogFindQuery({matchQuery : {} , limit , skip})
    );

    res.status(200).json({
        success : true,
        message : "You get all blogs successfully",
        data : blogData
    })
})

export const getSingleBlog= asyncHandler(async (req, res, next) => {
    const {id : blogId} = req.params;

    const blogsData = await blogs.aggregate(
        blogFindQuery({matchQuery : {_id : blogId} , limit : 1, skip : 0})
    )

    res.status(200).json({
        success : true,
        message : "We get a single blog successfully !",
        data : blogsData
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
    const {limit = 20, page= 1} = req.query;
    const skip = (page - 1) * limit;

    if(!category) return next(new ErrorHandler("Please provide the category", 400))
    const blogData = await blogs.aggregate(
        blogFindQuery({matchQuery : {category} , limit , skip})
    )
    res.status(200).json({
        success : true,
        message : "You get all blogs for this category successfully",
        data : blogData
    })
})

export const getMyCreatedBlog = asyncHandler(async (req, res, next) => {
    const {limit = 20 , page = 1} = req.query;
    const skip = (page - 1) * limit;

    const myCreatedBlogs = blogs.aggregate(
        blogFindQuery({matchQuery : {creator : req.user.id} , limit , skip})
    )

    res.status(200).json({
        success : true,
        message : "You get all your created blogs successfully",
        data : myCreatedBlogs
    })
})



