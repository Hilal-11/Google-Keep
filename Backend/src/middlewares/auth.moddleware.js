import JWT from 'jsonwebtoken'
import ApiError from '../utils/api-error'
import { asyncHandler } from '../utils/async-handler'
import User from '../models/UserSchema'

const varifyJWT = asyncHandler(async(req , res , next) => {
    const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
    if(!token) {
        return new ApiError(
            500,
            "Invalid access token"
        )
    }
   try{
        const decodedToken = JWT.varifyJWT(token , process.env.ACCESS_TOKEN_SECRET_KEY);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVarificationToken -emailVarificationTokenExpiry");
        if (!user) {
        throw new ApiError(401, "Invalid access token");
        }
        
        req.user = user
        next();
   }catch(error) {
    throw new ApiError(401, error?.message || "Invalid access token");
   }
})

const isAuthenticate = asyncHandler(async(req , res , next) => {
    const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
    if(!token) {
        return new ApiError(
            500,
            "Invalid access token"
        )
    }
    try{
        const payload = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        console.log(payload)
        const user = await User.findById(payload?._id).select("-password -refreshToken -emailVarificationToken -emailVarificationTokenExpiry")
        req.user = user;
        next();
    }catch(error) {
        next();
    }
})

export default { varifyJWT , isAuthenticate }