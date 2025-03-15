const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require("./cloudConfig")
const path = require("path")

function multerUpload (folder) {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            const folderPath = folder.trim()
            const fileExtension = path.extname(file.originalname).substring(1) || ".jpg"
            const publicId = `${file.fieldname}-${Date.now()}`

            return {
                folder: folderPath,
                public_id: publicId,
                format: fileExtension
            }
       }
       
    })

    return multer({
        storage: storage,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
    })
}

module.exports = multerUpload