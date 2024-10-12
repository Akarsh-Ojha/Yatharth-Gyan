import req from "express/lib/request.js";
import {catchAsyncError} from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const register = catchAsyncError(async (req, res, next) =>{

    if(!req.files || Object.keys(req.files).length === 0 ) {
        return next(new ErrorHandler("User Avatar is Required!", 400));
    }

    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg","image/webp"];

    if(!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("Invalid File Format. Only PNG, JPG, JPEG, WEBP are allowed", 400));

    }



    const { name, email, password, phone, role, education } = req.body;

    if(!name || !email || !password || !phone || !role || !education || !avatar) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    let user =  await User.findOne({email});

    if(user) {
        return next( new ErrorHandler("User already exists", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
    )

    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error", cloudinaryResponse.error || "Unknown Cloudinary Error");
    }

    user = await User.create({
        name,
        email,
        password,
        phone,
        role,
        education,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    sendToken(user,200,"User registered successfully",res);
});

export const login  = catchAsyncError(async function(req, res, next) {
    const { email, password, role } = req.body;
    if( !email || !password || !role) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password!", 400))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email and Password", 400));
    }

    if(user.role !== role){
        return next(
            new ErrorHandler(`User with provided role(${role}) not found`)
        )
    }

    sendToken(user , 200, "User logged in successfully", res);
})

export const logout = catchAsyncError((req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        
    })
    .json({
        success:true,
        message: "Logged out successfully",
    })
})

export const getMyProfile = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

export const getAllAuthor = catchAsyncError( async(req, res, next) => {
    const authors = await User.find({role: "Author"});
    res.status(200).json({
        success:true,
        authors,
    })
})