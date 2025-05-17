
const keepImages = async(req , res) => {
    try{
        const { noteId , imageUrl } = req.body;
        const imageFile = req.files.imageFile;
        const imageType = ``
        const supportImages = ['jpg', 'png', 'jpeg' , 'webp'];
        const isSupport = checkImageUploadSuport(imageType ,supportImages)

    }catch(error) {
        return res.json({
            success: false,
            message: "failed to keep images with notes"
        }) 
    }
}