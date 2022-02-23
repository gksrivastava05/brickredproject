const multer = require('multer');
const fileValidate = require('../middleware/fileUploadValidate');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },

    filename: function(req, file, cb) {

        // cb(null, file.originalname + '-' + Date.now());
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const uploading_file = (req) => {
    let upload_file = multer({
        storage: storage,
        fileFilter: fileValidate.fileFilter,

        limits: { fileSize: 1000000 }
    }).any();

    console.log("upload file -->  ");
    return upload_file;


}

module.exports.uploading_file = uploading_file;