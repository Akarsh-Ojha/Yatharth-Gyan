import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middleware/error.js";
import jwt from "jsonwebtoken";

//  Authenticate user
export const isAuthenticated = catchAsyncError( async(req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    } 

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decode.id);

    next();
})


// Authorize roles
export const isAuthorized = (...roles) => { // ... is spread oprator
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) { // if role of user and given role is not equal
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
}