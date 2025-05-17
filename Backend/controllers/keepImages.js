const cloudinary = require('../config/cloudinary')
const Note = require('../models/NoteSchema')
const keepImages = async(req , res) => {
    // checking the support ----> function
    const checkImageUploadSuport = (type , supportTypes) => {
        return supportTypes.includes(type)
    }
    try{
        const { noteId , imageUrl } = req.body;
        const imageFile = req.files.imageFile;  // get the image 
        const imageType = `${imageFile.name.split('.')[1].toLowerCase()}` // extract the image type or extension
        const supportImages = ['jpg', 'png', 'jpeg' , 'webp']; // images upload support extensions
        const isSupport = checkImageUploadSuport(imageType ,supportImages)   // checking for extension support
        
        if(!isSupport) {
            return res.json({
                success: false,
                message: "Image type not support"
            })
        }
        
    }catch(error) {
        return res.json({
            success: false,
            message: "failed to keep images with notes"
        }) 
    }
}