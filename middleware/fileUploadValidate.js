const path = require('path');

const fileFilter = function(req, file, cb) {
    console.log('Inside filefilter ');

    const ext = path.extname(file.originalname);
    console.log("extention - ", ext);
    const allowed = ['.png', '.jpg', '.jpeg', '.pdf', '.odt'];

    if (allowed.includes(ext)) {
        console.log("Inside file filter if cond")
        cb(null, true);
    } else {

        return cb(new Error('Only files are allowed!'), false);
    }


}

module.exports.fileFilter = fileFilter;