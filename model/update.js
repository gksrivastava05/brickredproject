const conndb = require('../conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');

const updateData = (req, id) => {
    return new Promise((resolve, reject) => {
        var { name, email } = req.body;

        DB.query("update registration set name = $1, email = $2 where registration_id = $3", [name, email, id]).then((updated) => {
            resolve("sucessfully update");
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.updateData = updateData;