import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
    username: { type: String , required: true, trim: true },
    email: { type: String , required: true, trim: true , lowercase: true},
    password: { type: String, required: true, trim: true },
    role: { type: String, enum:["user" , "admin"] , default: "user"},
    isVarified: { type: Boolean , default: false},
    emailVarifivationToken: { type: String , trim: true},
    emailVarifivationTokenExpiry: { type: Date },

    forgetPasswordToken: { type: String },
    forgetPasswordTokenExpiry: { type: Date },

    refreshToken: { type: String },
    refreshTokenExpiry: { type: Date },

    accessToken: { type: String },
    accessTokenExpiry: { type: Date },

}, { timestamps: true })

UserSchema.pre("save", async function (next){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password , 10);
    }
    next();
})
// compare password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// generate refresh token

UserSchema.methods.generateRefreshToken = function() {
    return JWT.sign(
        { 
            _id: this._id,
            user: this.username,
            email: this.email,
            role: this.role
        },
        process.env.REFRESH_TOKEN_SECRET_KEY ,
        { expiresIn : "24h"}
    )
}
// geenerate access token 
UserSchema.methods.generateAccessToken = function () {
    return JWT.sign(
        {
            _id: this._id,
            user: this.username,
            email: this.email,
            role: this.role 
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "15m"}
    )
}
// generate temporary token
UserSchema.methods.generateTempororyToken = async function () {
    const unHashedToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry = Date.now() + (20 * 60 * 10000); //20-minutes

    return  { unHashedToken , hashedToken , tokenExpiry }
}
const User = mongoose.model("User", UserSchema);
export default User