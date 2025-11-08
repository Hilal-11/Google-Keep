import { ApiResponse } from "../utils/api-response"
import ApiError from "../utils/api-error"
import { asyncHandler } from "../utils/async-handler"
import User from "../models/UserSchema"
import JWT from "jsonwebtoken"

const generateRefreshToken = (req , res) => {

}

const signin = asyncHandler(async (req , res) => {

})
const login = asyncHandler(async (req , res) => {
    
})
const logout = asyncHandler(async (req , res) => {
    
})

const verifyEmail = asyncHandler(async (req , res) => {
    
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