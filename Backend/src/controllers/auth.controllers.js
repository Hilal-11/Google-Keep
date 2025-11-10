
import { ApiResponse } from "../utils/api-response"
import ApiError from "../utils/api-error"
import { asyncHandler } from "../utils/async-handler"
import User from "../models/UserSchema"
import JWT from "jsonwebtoken"
import crypto from "crypto"


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


const resendVerificationEmail = asyncHandler(async (req , res) => {
    // extract email using params or body
    const user = await User.findById(req?.user._id)
    // validate
    if(!user) {
        return new ApiError(
            400,
            "user not exists"
        )
    }
    // check first is user already varify or not
    if(user.isVarified) {
        return new ApiError(400, "User email already varified")
    }
    // generate hashed and unhashed token ---- store hashed on DB and send unhashed to user 
    const { hashedToken , unHashedToken , tokenExpiry } = user.generateTemporaryToken();
    user.emailVarifivationToken = hashedToken,
    user.emailVarifivationTokenExpiry = tokenExpiry

    // send mail with email Token link/token

    // return response
    return res.status(200).json(
        new ApiResponse(
            200,"user varified successfully"
        )
    )
    
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
    const user = await User.findByIdAndUpdate(
        req?.user._id,
        {
            $set: {
                refreshToken: ""
            }
        },
        { new: true }
    );

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
        .clearCookie("accessToken" , options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, "User Logout successfully")
        )
})




const forgetPasswordRequest = asyncHandler(async (req , res) => {
    const { email } = req.body;
    
    const user = await User.findOne(email);
    if(!user) {
        return new ApiError(401 , "User not exists")
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

    user.forgetPasswordToken = unHashedToken;
    user.forgetPasswordTokenExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    // send mail with reset password link with token

    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id"
      )
    );
})

const refreshAccessToken = asyncHandler(async (req , res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = JWT.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET_KEY)

    const user = await User.findById(decodedToken?._id);
    if(!user) {
        return new ApiError(
            401,
            "Invalid refresh token"
        )
    }

    if(incomingRefreshToken !== user.refreshToken) {
        return new ApiError(401 , "Refresh token is expired or used")
    }

    const { accessToken , refreshToken: newRefreshToken } = user.generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60, // Cookie expiration in milliseconds (e.g., 1 hour)
        path: '/', 
        domain: process.env.PRODUCTION_URL || process.env.BASE_URL,           
    }


    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });


    return res.status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken", newRefreshToken , options)
        .json(
            new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token and refresh token generated successfully")
        )


})

const resetPassword = asyncHandler(async (req , res) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    let hashToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

        const user = await User.findOne({
            forgetPasswordToken: hashToken,
            forgetPasswordTokenExpiry: { $gt: Date.now() },
        })

        if(!user) {
            return new ApiError(401, "User not forun, invalid reset password token")
        }

        user.forgetPasswordToken = undefined
        user.forgetPasswordTokenExpiry = undefined

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(
                200 , "Password reset successfully"
            )
        )

})  

const changeCurrentPassword = asyncHandler(async (req , res) => {
    const { oldPassword , newPassword } = req.body;
    const user = await User.findById(req,user._id)
    
    if(!user) {
        return new ApiError(404 , "user not found")
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if(!isPasswordValid) {
        return new ApiError(401, "Incorrect Password, please enter valid password")
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });


    return res.status(200).json(
        new ApiResponse(
            200, {}, "Password change successfully"
        )
    )
})

const userProfile = asyncHandler(async (req , res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
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