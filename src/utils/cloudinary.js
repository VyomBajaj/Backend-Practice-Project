import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:false
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const resp = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        //File has been uploaded successfully
        console.log("File Uploaded Successfully",resp.url);
        return resp;

    } catch (error) {
        //Remove the temporary file saved on the server as
        // upload got failed
        fs.unlinkSync(localFilePath);
        return null;
    }
}
export {uploadOnCloudinary};