import Note from "../models/NoteSchema.js"
import { v2 as cloudinary } from "cloudinary";
import { asyncHandler } from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const uploadImageToCloudinary = async (file , folder) => {
    try{
        const options = { folder , resource_type: "auto" };
        return await cloudinary.uploader.upload(file.tempFilePath , options);
    }catch(error) {
        return new ApiError(
            500,
            "Could't upload image file to Cloudinary ~ something went wrong."
        )
    }
}
const uploadVideoToCloudinary = async (file , folder) => {
    try{
        const options = { folder , resource_type: "video" }
            console.log("Uploading video:", file.name);
            console.log("Temp path:", file.tempFilePath);
            console.log("MIME type:", file.mimetype);

        return await cloudinary.uploader.upload_large(file.tempFilePath , options);
    }catch(error) {
        throw new ApiError(
            500,
            `Could't upload video file to Cloudinary ~ something went wrong. ${error.message}`
        )
    }
}

const mediaUpload = asyncHandler(async (req, res) => {
    const { noteId } = req.body;
    console.log(noteId)
    const file = req.files.mediaFile;
    console.log(file)
    if(!noteId || !file) {
        throw new ApiError(
            400,
            false,
            "Media file and note is not defined"
        )
    }
    console.log("File type:", file.mimetype);

    const imageTypes = ["jpg", "jpeg", "png", "webp"];
    const videoTypes = ["mp4", "mov", "avi"];

    // const mediaType = `${file.name.split(".")[1].toLowerCase()}`
    const mediaType = file.name.split(".").pop().toLowerCase();

    console.log(mediaType)

    if(imageTypes.includes(mediaType)) {
        const response = await uploadImageToCloudinary(file , "Cloudinary_11")
        console.log(response)

        if (!response || !response.secure_url) {
            throw new ApiError(500, "Upload failed — no media URL returned");
        }

        // now save on databese
        const note = await Note.findById(noteId);
        if(!note) {
            throw new ApiError(
                400,
                false,
                "Note not found"
            )
        }
        note.note_mediaFile.push(response?.secure_url);
        await note.save();

        
        return res.status(200).json(
            new ApiResponse(
                200,
                true,
                `Media uploaded and saved to note ${response?.secure_url}`
            )
        );

    }else if (videoTypes.includes(mediaType)) {
        const response = await uploadVideoToCloudinary(file , "Cloudinary_11")
        console.log(response)
        if (!response || !response.secure_url) {
            throw new ApiError(500, "Upload failed — no media URL returned");
        }
        // now save on databese

        const note = await Note.findById(noteId);
        if(!note) {
            throw new ApiError(
                400,
                false,
                "Note not found"
            )
        }

        note.note_mediaFile.push(response?.secure_url);
        await note.save()

        
        return res.status(200).json(
            new ApiResponse(
                200,
                true,
                `Media uploaded and saved to note ${response.secure_url}`
            )
        );
    }else {
        throw new ApiError(
            400,
            false,
            "Media type not support!!"
        )
    }
})


export default mediaUpload