// Can keep it in service folder also
import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs';  //file system module to handle file operations 
// Configure Cloudinary with environment variables
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
const uploadOnCloudinary = async (localFilePath) => {
    try{
        if (!localFilePath) {
            throw new Error("No file path provided for upload.");
        }
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',  // Automatically detect resource type (image, video, etc.)
        });
        console.log(`File uploaded successfully: ${response.url}`);
        
        return response;  // Return the upload result
    }
    catch (errorr){
        fs.unlinkSync(localFilePath);  // Delete the local file if upload fails
        return null;
    }
}

export { uploadOnCloudinary };