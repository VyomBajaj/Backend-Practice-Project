import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.error("Invalid file path:", localFilePath);
      return null;
    }

    console.log("Uploading file:", localFilePath);

    // ✅ Signed upload (No need for upload preset)
    const resp = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //console.log("File Uploaded Successfully:", resp.secure_url);
    fs.unlinkSync(localFilePath);
    return resp;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);

    // ✅ Delete temp file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;
