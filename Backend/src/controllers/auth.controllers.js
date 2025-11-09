import { ApiResponse } from "../utils/api-response"
import ApiError from "../utils/api-error"
import { asyncHandler } from "../utils/async-handler"
import User from "../models/UserSchema"
import JWT from "jsonwebtoken"
import crypto from "crypto"
import { use } from "react"
const generateAccessAndRefreshToken = async(userId) => {
    try{
        const user = await User.findById(userId);
        if(!user) {
            return new ApiError(401, "User not found")
        }
        const accessToken = user.generateAccessToken;
        const refreshToken = user.generateRefreshToken;

        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken , refreshToken }
    }catch (error) {
        return new ApiError(500 , "Can't generate tokens")
    }
}

const signin = asyncHandler(async (req , res) => {
    const { username , email , password } = req.body;
    try{
        const existUser = await User.findOne({
            $or: [{ username }, {email}]
        })
        if(existUser) {
            return new ApiError(500 ,"User already exists")
        }
        const user = await User.create({
            username,
            email,
            password,
            isVarified: false,
        })
        const { unHashedToken , hashedToken , tokenExpiry} = user.generateTemporaryToken;

        user.emailVarifivationToken = unHashedToken;
        user.emailVarifivationTokenExpiry = tokenExpiry;
        user.save({ validateBeforeSave: false });

        // send mail and varification emial link/mail

        // create response
        const createUser = User.findById(user?._id).select("-password -emailVarifivationToken -emailVarifivationTokenExpiry")

        if(!createUser) {
            return new ApiError(401 , "User not exists")
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                "User signin successfully",
                createUser
            )
        )
    }catch(error) {
        return new ApiError(500 , `Failed to signup ${error?.message}`)
    }
})

const verifyEmail = asyncHandler(async (req , res) => {
    const { varificatioToken } = req.params;
    if(!varificatioToken){
        return new ApiError(401 , "Invalid varification token")
    }

    try{
        let hashedToken = crypto
        .createHash("sha256")
        .update(varificatioToken)
        .digest("hex")

        const user = User.findOne({
            emailVarifivationToken: hashedToken,
            emailVerificationExpiry: { $gt: Date.now() },
        })

        if(!user) {
            return new ApiError(401, "user not found, invalid token")
        }

        user.emailVarifivationToken = undefined
        user.emailVarifivationTokenExpiry    = undefined
        user.isVarified = true

        await user.save({ validateBeforeSave: true });

        return res.stat(200).json(
            new ApiResponse(
                200,
                "email varify successfully"
            )
        )

    }catch(error) {
        return new ApiError(501 , "Failed to varify email")
    }
})



const login = asyncHandler(async (req , res) => {
    const { email , password } = req.body;

    try{
        const user = User.findOne({
            $or: [{ username }, { email }],
        });
        if(!user) {
            return new ApiError(401 ,"User not exists")
        }

        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid) {
            return new ApiError(401, "Invalid username and password, ailed to login")
        }

        const { accessToken , refreshToken } = generateAccessAndRefreshToken(user._id)


        const loggedInUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 1000 * 60 * 60, // Cookie expiration in milliseconds (e.g., 1 hour)
            path: '/', 
            domain: process.env.PRODUCTION_URL || process.env.BASE_URL,           
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken , options)
            .cookie("refreshToken" , refreshToken , options)
            .json(
                new ApiResponse(
                    200,
                    { user: loggedInUser, accessToken, refreshToken }, // send access and refresh token in response if client decides to save them by themselves
                    "User logged in successfully"
                )
            );

    }catch(error) {
        return new ApiError(401, "Failed to login user")
    }
})

const logout = asyncHandler(async (req , res) => {
    
})



const resendVerificationEmail = asyncHandler(async (req , res) => {
    
})
const forgetPasswordRequest = asyncHandler(async (req , res) => {
    
})
const refreshAccessToken = asyncHandler(async (req , res) => {

})

const resetPassword = asyncHandler(async (req , res) => {
    
})

const changeCurrentPassword = asyncHandler(async (req , res) => {

})

const userProfile = asyncHandler(async (req , res) => {
    
})


export { 
    signin , 
    login , 
    logout , 
    verifyEmail , 
    resendVerificationEmail ,
    generateRefreshToken ,  
    refreshAccessToken , 
    forgetPasswordRequest , 
    changeCurrentPassword , 
    resetPassword , 
    userProfile
}