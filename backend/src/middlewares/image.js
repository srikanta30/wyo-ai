const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, uniquePrefix + path.extname(file.originalname));
    }
});

const fileFilter = function (req, file, callback) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/bmp" || file.mimetype === "image/webp") {
       callback(null, true)
    } else {
       callback(null, false)
       return callback(new Error("Non-supporting file types - JPEG, PNG, BMP and WEBP are acceptable."))
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
})

module.exports = upload