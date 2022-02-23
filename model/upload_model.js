const conndb = require('../conndb.js');
const DB = conndb.DB;


const uploadInDB = (files) => {

    for (let data of files) {
        DB.query('insert into  upload_file_tb values(default, $1)', data.filename)
    }

}

module.exports.uploadInDB = uploadInDB;