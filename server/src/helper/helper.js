import {v2 as cloudinary} from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'

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

