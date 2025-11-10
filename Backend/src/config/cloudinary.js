import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config();
import logger from "../logger/winston.logger"
 
const cloudinaryConnect = async () => {
  try{
    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure_distribution: 'mydomain.com',
      upload_prefix: 'https://api-eu.cloudinary.com'
    });
    logger.info("Cloudinary connected successfully")
  }catch(error) {
    logger.error("Failed to connect cloudinary", error.message)
  }
}

export default cloudinaryConnect();