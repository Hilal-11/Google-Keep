import express from 'express';
const router = express.Router()
import validator from '../middlewares/validate.js';
import {
  signInValidator,
  loginValidator,
  resetPasswordValidator,
  changeCurrentPasswordValidator
} from "../validation/authValidation.js";
import {
  verifyJWT,
  isAuthenticate
} from "../middlewares/auth.middleware.js";
import {
  signin,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  forgetPasswordRequest,
  changeCurrentPassword,
  refreshAccessToken,
  resetPassword,
  userProfile
} from "../controllers/auth.controllers.js";


// test route
router.route("/test").get(async (req , res) => {
  res.json({
    name: "Testing",
    sucees: true,
    status: 200,
    message: "Hey bro backend is working, you are listning from http://localhots:3000/api/v1/auth/test"
  })
})

router.route("/signin").post(signInValidator(), validator, signin)
router.route("/login").post(loginValidator() , validator , login)
router.route("/varify-email/:varificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/forget-password").post(forgetPasswordRequest);
router.route("/reset-password/:resetToken").post(resetPasswordValidator(), validator , resetPassword);


router.route("/resend-email-verification").post(verifyJWT, resendVerificationEmail)
router.route("/change-password").post(verifyJWT, changeCurrentPasswordValidator(), validator, changeCurrentPassword);
router.route("/logout").post(verifyJWT, logout);
router.route("/profile").get(verifyJWT , userProfile);

export default router