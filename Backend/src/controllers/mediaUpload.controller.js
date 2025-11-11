import Note from "../models/NoteSchemajs"
import { cloudinary } from "cloudinary"
import { asyncHandler } from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";


const uploadImageToCloudinary = async (file , folder) => {
    try{
        const options = { folder };
        return await cloudinary.uploader.upload(file.tempFileName , options);
    }catch(error) {
        return new ApiError(
            500,
            "Could't upload image file to Cloudinary ~ something went wrong."
        )
    }
}
const uploadVideoToCloudinary = async (file , folder) => {
    try{
        const options = { folder , resource_type: "video", }
        return await cloudinary.uploader.upload(file.tempFileName , options);
    }catch(error) {
        return new ApiError(
            500,
            "Could't upload video file to Cloudinary ~ something went wrong."
        )
    }
}

const mediaUpload = asyncHandler(async (req, res) => {
    const { noteId , } = req.body;
    const file = req.files.mediaFile;
    if(!noteId || !file) {
        return new ApiError(
            400,
            false,
            "Media file and note is not defined"
        )
    }
    
    const imageTypes = ["jpg", "jpeg", "png", "webp"];
    const videoTypes = ["mp4", "mov", "avi"];

    const mediaType = `${file.name.split(".")[1].toLowerCase()}`
    console.log(mediaType)

    if(imageTypes.includes(mediaType)) {
        const response = await uploadImageToCloudinary(file , "Cloudinary_11")
        console.log(response)

        // now save on databese
        const note = await Note.findById(noteId);
        if(!note) {
            return new ApiError(
                400,
                false,
                "Note not found"
            )
        }
        note.note_mediaFile.push(response.secure_url);
        await note.save();

        const res_url = response.secure_url;
        return res.status(200).json(
            new ApiResponse(
                200,
                true,
                res_url,
                "Media uploaded and saved to note"
            )
        );

    }else if (videoTypes.includes(mediaType)) {
        const response = await uploadVideoToCloudinary(file , "Cloudinary_11")
        console.log(response)

        // now save on databese

        const note = await Note.findById(noteId);
        if(!note) {
            return new ApiError(
                400,
                false,
                "Note not found"
            )
        }

        note.note_mediaFile.push(response.secure_url);
        await note.save()

        const res_url = response.secure_url;
        return res.status(200).json(
            new ApiResponse(
                200,
                true,
                res_url,
                "Media uploaded and saved to note"
            )
        );
    }else {
        return new ApiError(
            400,
            false,
            "Media type not support!!"
        )
    }
})


// const avatarUploadHandler = asyncHandler(async (req , res) => {
    
// })


export { mediaUpload };