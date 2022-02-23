const conndb = require('../conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');

const insertNewUser = (req) => {
    return new Promise((resolve, reject) => {

        let reqbody = req.body;
        console.log("Inside insertNewUser", reqbody);
        let password = bcryptjs.hashSync(reqbody.password, 10);

        DB.query("insert into user_tb  values (default, $1, $2, $3, $4, $5) RETURNING user_id", [reqbody.name, reqbody.email, reqbody.birthDate, reqbody.username, password]).then((result) => {
            console.log("result ", result);
            reqbody.user_id = result[0].user_id;
            resolve(reqbody);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.insertNewUser = insertNewUser;