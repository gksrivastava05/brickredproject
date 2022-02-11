const conndb = require('../conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');


const checkUserCredential = (reqBody) => {
    var message_part = {};
    return new Promise((resolve, reject) => {
        DB.query("select * from registration where username = $1", reqBody.username).then((user) => {
            if (user < 1) {
                message_part = {
                    message: "Incorrect Username and Password"
                }
                reject(message_part);
            } else {
                console.log("else part")
                bcryptjs.compare(reqBody.password, user[0].password, function(err, result) {
                    if (!result) {
                        console.log("if condition", err);
                        message_part = {
                            message: "Incorrect Username and Password"
                        }
                        reject(message_part);
                    } else {

                        console.log("Userinfo", user[0]);
                        resolve(user[0]);
                    }
                })
            }
        }).catch((error) => {
            console.log("Error in checkUserCredential ", error);
            reject(error);
        })
    });
}

module.exports.checkUserCredential = checkUserCredential

const getAllUser_old = async() => {
    return new Promise((resolve, reject) => {

        console.log("Inside getAllUser");
        DB.query("select registration_id, name, email, birthdate from registration").then((result, error) => {
            if (error) {
                console.log("Inside if condition")
                reject(error);

            } else {
                console.log("Inside else")
                resolve(result)

            }
        })

    })


}

const getAllUser = async() => {

    console.log("Inside getAllUser");

    let data = await DB.query('select registration_id, name, email, birthdate from registration');
    console.log(data);
    return data;
}

module.exports.getAllUser = getAllUser;


// static async getUserData({ email }) {
//     let data = await pool.query(`select * from ${dbtable.USER} where email = ($1)`, [email])
//     return data.rows
// }