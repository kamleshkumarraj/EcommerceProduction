import {v2 as cloudinary} from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import mongoose from 'mongoose'

export const uploadMultipleFilesOnCloudinary = async (files = [] , folder) => {
    if(files.length === 0) return {success : 'file not found' , error : 'No any files found !'}
    const filesPromiseArray = files.map((file) => new Promise((resolve , reject) => {
        cloudinary.uploader.upload(file.path , {
            resource_type : 'auto',
            folder : folder,
            public_id : uuidv4() 
        },  (err , result) => {
            if(err) return reject(err)
            else resolve(result)
        })
    }) )

    try {
        const resultsArr = await Promise.all(filesPromiseArray)
        const results = resultsArr.map((result) => ({
            public_id : result.public_id,
            url : result.secure_url
        }))
        return {success : true , results}
    } catch (error) {
        return {success : false , error}
    }
    
}
export const removeMultipleFileFromCloudinary = async (files = []) => {
    const filesPromiseArray = files.map((file) => new Promise((resolve , reject) => {
        cloudinary.uploader.destroy(file , (err , result) => {
            if(err) return reject(err)
            else resolve(result)
        })
    }) )

    try {
        await Promise.all(filesPromiseArray)
        return {success : true}
    } catch (error) {
        return {success : false , error}
    }
}


export const removeFile = async (files = []) => {
    if(files.length == 0) return
    await Promise.all(files.map((file) => fs.unlink(file?.path)))
}

export const getEligibleSocketToGetMessage = (members = [] ,userSocketId) => {
    const eligibleSocketList = members.flatMap((memberId) => userSocketId.get(memberId))
    return eligibleSocketList.filter((socket) => socket !== undefined)
}

export const blogFindQuery =  ({matchQuery , limit, skip,}) => [
    {
      $match: matchQuery,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'creator',
        foreignField: '_id',
        as: 'creatorDetails',
        pipeline: [
          {
            $project: {
              creatorName: { $concat: ['$firstname', ' ', '$lastname'] },
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
        as: 'commentsData',
      },
    },
    {
      $lookup: {
        from: 'blogreactions',
        localField: '_id',
        foreignField: 'blogId',
        as: 'blogReactions',
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
        commentCount: {$size : "$commentsData"},
        blogReactions : 1,
        shareCount : 1,
        viewCount : 1
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]

export const commentFindQuery = ({matchQuery, skip, limit, userId}) => [
  { $match: matchQuery },
  {
    $lookup: {
      from: 'users',
      localField: 'creator',
      foreignField: '_id',
      as: 'creatorDetails',
      pipeline: [
        {
          $project: {
            creatorName: { $concat: ['$firstname', ' ', '$lastname'] },
            avatar: 1,
            username: 1,
            email: 1,
            _id: 1,
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'replycomments',
      localField: '_id',
      foreignField: 'commentId',
      as: 'replyComment',
      pipeline: [
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creatorDetails',
            pipeline: [
              {
                $project: {
                  creatorName: { $concat: ['$firstname', ' ', '$lastname'] },
                  avatar: 1,
                  username: 1,
                  email: 1,
                  _id: 1,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'commentreactions',
            foreignField: 'commentId',
            localField: '_id',
            as: 'replyReactions',
            pipeline: [
              {
                $group: {
                  _id: '$reaction',
                  count: { $sum: 1 },
                  likeCreatorList : {$push : {
                    $cond : {
                      if : {$eq : ["$reaction" , "like"]},
                      then : "$creator",
                      else : null
                    }
                  }},
                  dislikeCreatorList : {$push : {
                    $cond : {
                      if : {$eq : ["$reaction" , "dislike"]},
                      then : "$creator",
                      else : null
                    }
                  }},
                },
              },
              {
                $project: {
                  reaction: '$_id',
                  count: { $sum: 1 },
                  _id : 0,
                  likeCreatorList : 1,
                  dislikeCreatorList : 1
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
            reply: 1,
            _id: 1,
            replyReactions: 1,
          },
        },
      ],
    },
  },
  {
    $unwind: '$creatorDetails',
  },
  // now we find like count for a comment.
  {
    $lookup: {
      from: 'commentreactions',
      localField: '_id',
      foreignField: 'commentId',
      as: 'commentReactions',
      pipeline: [
        {
          $group: {
            _id: '$reaction',
            count: { $sum: 1 },
            likeCreatorList : {$push : {
              $cond : {
                if : {$eq : ["$reaction" , "like"]},
                then : "$creator",
                else : null
              }
            }},
            dislikeCreatorList : {$push : {
              $cond : {
                if : {$eq : ["$reaction" , "dislike"]},
                then : "$creator",
                else : null
              }
            }},
          },
        },
        {
          $project: {
            reaction: '$_id',
            count: 1,
            likeCreatorList : 1,
            dislikeCreatorList : 1,
            _id: 0
          },
        },
      ],
    },
  },
  
  {
    $sort: {
      createdAt: -1,
    },
  },
  {
    $project: {
      creatorDetails: 1,
      comment: 1,
      replyComment: 1,
      replySize: { $size: '$replyComment' },
      commentReactions: 1,
    },
  },
  
  {
    $skip: skip,
  },
  {
    $limit: limit,
  },
]

