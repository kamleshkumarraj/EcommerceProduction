import { asyncHandler } from '../../errors/asynHandler.js';
import ErrorHandler from '../../errors/errorHandler.js';
import {
  removeFile,
  removeMultipleFileFromCloudinary,
  uploadMultipleFilesOnCloudinary,
} from '../../helper/helper.js';
import { comments } from '../../models/blog/comments.models.js';
import { ProductsBlogs } from '../../models/blog/productsBlog.model.js';

const blogFindQuery =  ({matchQuery , limit, skip,}) => [
    {
      $match: matchQuery,
    },
    {
      $lookup: {
        from: 'User',
        localField: 'creator',
        foreignField: '_id',
        as: creatorDetails,
        pipeline: [
          {
            $project: {
              creatorName: { $concat: ['$firstName', ' ', '$lastName'] },
              avatar: 1,
              email: 1,
              username: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'blogId',
        as: comments,
        pipeline: [
          {
            $count: 'commentsCounts',
          },
          {
            $project: {
              _id: 0,
              commentsCounts: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'blogReactions',
        localField: '_id',
        foreignField: 'blogId',
        as: blogReactions,
        pipeline: [
          {
            $group: {
              _id: '$reaction',
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              reactionType: '$_id',
              count: 1,
            },
          },
        ],
      },
    },

    {
      $unwind: '$creatorDetails',
    },

    {
      $project: {
        creatorDetails: 1,
        title: 1,
        content: 1,
        summary: 1,
        slug: 1,
        category: 1,
        thumbnail: 1,
        images: 1,
        subCategory: 1,
        createdAt: 1,
        updatedAt: 1,
        comments: 1,
        blogReactions : 1
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]

export const createBlog = asyncHandler(async (req, res, next) => {
  const thumbnailData = req?.files?.thumbnail || [];
  const imagesData = req?.files?.images || [];

  //we extract the all properties from the request body
  const {
    title,
    content,
    summary,
    slug,
    category = 'products',
    subCategory,
  } = req.body;
  // if user provide images but not thumbnail, then we will take the first image as thumbnail
  if (thumbnailData.length == 0) {
    if (imagesData.length > 0) {
      thumbnailData.push(imagesData[0]);
    } else
      return next(new ErrorHandler('Please provide at least one image', 400));
  }

  // now we upload the thumbnail and images to cloudinary
  const thumbnailResult = await uploadMultipleFilesOnCloudinary([
    ...thumbnailData,
    ...imagesData,
  ]);
  if (thumbnailResult?.success == false)
    return next(new ErrorHandler(thumbnailResult.error, 400));

  // and then we get the publicId and url of the thumbnail and images for saving in the database
  const thumbnail = {
    publicId: thumbnailResult.results[0]?.public_id,
    url: thumbnailResult.results[0]?.url,
  };

  const images = thumbnailResult.results
    .slice(1, thumbnailResult.length)
    .map((image) => {
      return {
        publicId: image.public_id,
        url: image.url,
      };
    });
  // now we remove the thumbnail file from the server
  await removeFile(thumbnailData);

  // now we create the blog in the database
  const blog = await ProductsBlogs.create({
    title,
    content,
    summary,
    slug,
    category,
    thumbnail,
    images,
    creator: req?.user?._id,
    subCategory,
  });

  res.status(201).json({
    success: true,
    message: 'Blog created successfully for products',
    data: blog,
  });
});

export const getAllBlogsDetailsCategoriesWise = asyncHandler(
  async (req, res, next) => {
    const productsBlogs = ProductsBlogs.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: '$subCategory',
          count: { $sum: 1 },
          thumbnail: { $push: '$thumbnail' },
        },
      },
      { $sort: { count: -1 } },
      {
        $project: {
          count: 1,
          thumbnail: 1,
          subCategory: '$_id',
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Products Blogs Details Categories Wise',
      data: productsBlogs,
    });
  },
);

export const getAllProductsBlog = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const productsBlogs = await ProductsBlogs.aggregate(
    blogFindQuery({matchQuery : {} , skip, limit})
);

  return res.status(200).json({
    success: true,
    message: 'You get all products blogs successfully.',
    data: productsBlogs,
  });
});

export const getMyCreatedProductBlogs = asyncHandler(async (req, res, next) => {
  const myCreatedProductBlogs = await ProductsBlogs.aggregate(
    blogFindQuery({matchQuery : {creator : req?.user?._id} , skip, limit})
  );

  return res.status(200).json({
    success: true,
    message: 'You get all your created products blogs successfully.',
    data: myCreatedProductBlogs,
  });
});

export const deleteBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;
  const deletedBlog = await ProductsBlogs.findByIdAndDelete(blogId);

  const thumbnail = deletedBlog.thumbnail;
  const images = deletedBlog.images;

  const status = await removeMultipleFileFromCloudinary([thumbnail, ...images]);
  if (status.success == false) return next(new ErrorHandler(status.error, 400));

  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const getCategoryBlogs = asyncHandler(async (req, res, next) => {
    const blogs = ProductsBlogs.aggregate(
        blogFindQuery({matchQuery : {category : req.params.category} , skip, limit})
    );
    return res.status(200).json({
        success : true,
        message : "You get all blogs that you created",
        data : blogs
    })
})
