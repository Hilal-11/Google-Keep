import { body , params } from "express-validator"

const signInValidator = () => {
    return [
        body("username")
            .isString()
            .notEmpty().withMessage("Username is required")
            .trim()
        ,
        body("email")
            .isString()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid")
            .trim()
        ,
        body("password")
            .isString()
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password should contain atleast 8 characters")
            .isLength({ max: 12}).withMessage("Password should only contain 12 characters")
        ,
        body("role")
            .optional()
            .isIn(AvailableUserRoles)
            .withMessage("Invalid user role"),
    ]
}

const loginValidator = () => {
    return [
        body("email")
            .isString()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid")
            .trim()
            
        ,
        body("password")
            .isString()
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password should contain atleast 8 characters")
            .isLength({ max: 12}).withMessage("Password should only contain 12 characters")
        ,
    ]
}
const resetPasswordValidator = () => {
    return [
        body("oldPassword").notEmpty().withMessage("Old password is required"),
        body("newPassword").notEmpty().withMessage("New password is required"),
    ]
}

const changeCurrentPasswordValidator = () => {
    return [
        body("oldPassword").notEmpty().withMessage("Old password is required"),
        body("newPassword").notEmpty().withMessage("New password is required"),
    ]
}

export default { signInValidator , loginValidator , resetPasswordValidator , changeCurrentPasswordValidator }