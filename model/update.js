const conndb = require('../conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');

const updateData = (req, id) => {
    return new Promise((resolve, reject) => {
        var { name, email, birthdate, username, password } = req.body;

        DB.query("update registration set name = $1, email = $2, birthdate =$3, username= $4, password = $5  where registration_id = $6", [name, email, birthdate, username, password, id]).then((updated) => {
            req.body.message = 'updated successfully'
            req.body.status_code = 200;
            resolve(req.body);
        }).catch((error) => {
            req.body.message = "somthing error";
            req.body.status_code = 400;
            req.body.error = error;
            reject(error);
        })
    })
}

module.exports.updateData = updateData;