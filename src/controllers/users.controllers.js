import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/users.models.js'
import uploadOnCloudinary  from "../utils/cloudinary.js";

const registerUser = asyncHandler( async (req,res)=>{
    // get user details from frontend
    // validation - is everything provided
    // check if user already exists:username and email
    // check for images
    // check for avatar
    // upload them to cloudinary
    // fetch url from cloudinary 
    // create user object - create entry in DB
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const { username, email, fullName ,password} = req.body;

    if(!username || !email || !fullName || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    // return res.status(200).json({message:"Validation Passed!!"});

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        return res.status(409).json({message:"User already exists"});
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path; 
    }

    if(!avatarLocalPath){
        return res.status(409).json({message:"Avatar Local Path not found"});
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // console.log(req.files);
    if(!avatar){
        return res.status(409).json({message:"Avatar not found"});
    }
    
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        username:username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        return res.status(500).json({message:"Something went wrong while registering the user"});
    }
    return res.status(201).json({
        createdUser,
        message:"User registered Successfully"
    })

} )

export {registerUser};