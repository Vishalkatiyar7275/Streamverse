import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req,res)=>{
    // Step 1: Get users details from frontend/Postman
    // Validation : not empty, valid email, password length, etc.
    // Check if user already exists : username or email
    // Check for image , check for avatar
    // upload them to cloudinary , avatar
    // create user object : Create entry in database
    // Remove passworad and refresh token fields from response
    // Check for user creation
    // Send response to frontend/Postman

    const { fullname, username, email, password } = req.body;
    console.log(`Received user registration details: ${fullname}, ${username}, ${email}`);
    // if (fullname==""){
    //     throw new ApiError(400,"fullname is required")

    // }
    //we can check if else multiple times but below is best way to validate
    if(
        [fullname, email, username, password].some((field)=>field?.trim()===" ")
    ){
        throw new ApiError(400, "ALl fields are required ")
    }
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or usename already exists ")
    }
    const avatarLocalFilePath = req.files?.avatar[0]?.path
    const coverImageLocalFilePath = req.files?.coverImage[0]?.path
    if(!avatarLocalFilePath){
        throw new ApiError(400, " Avatar file is required ")
    }
   
    const avatar = await uploadOnCloudinary(avatarLocalFilePath)
    const coverImage = await uploadOnCloudinary(coverImageLocalFilePath)
    if(!avatar){
        throw new ApiError(400, " Avatar file is required ")
    }

    const user =  User.create({
        fullname,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    return response.status(201).json(
        new ApiResponse(200, createdUser, "USer Registered Successfully ")
    )
})

export { registerUser };