import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload it on cloudinary
        const response = await cloudinary.uploader.upload
            (localFilePath, {
                resource_type: "auto"
            })
        //file has been uploaded successfully
        console.log("file is uploaded om cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlink(localFilePath) //remove locally saved temp file as upload operation got failed
        return null;
    }
}

export { uploadCloudinary }