const conndb = require('../conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');
const Pool = require('../modelconn');


const checkUserCredential = (reqBody) => {
    var message_part = {};
    return new Promise((resolve, reject) => {
        DB.query("select * from user_tb where username = $1", reqBody.username).then((user) => {
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
        DB.query("select user_id, name, email, birthdate from user_tb").then((result, error) => {
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

    // let data = await DB.query("select ut.user_id,name, email, birthdate, username, COALESCE(role_name, 'null') as role_name, COALESCE(ur.createdby, 'null') as createdby , COALESCE(ur.status, 0 ) as status from   user_tb ut left join user_role ur on ur.user_id = ut.user_id left join role_master_tb rmt on rmt.role_master_id = ur.role_master_id");
    // console.log(data);

    let data = await DB.query("select ut.user_id,name, email, birthdate, username, array_to_json(COALESCE(array_agg(to_json(rmt.*)) filter (where rmt.* is not null) , '{}')) as role   from   user_tb ut left join user_role ur on ur.user_id = ut.user_id left join role_master_tb rmt on rmt.role_master_id = ur.role_master_id group by ut.user_id order by ut.user_id")


    console.log("get all user-> ", data);

    return data;
}

module.exports.getAllUser = getAllUser;


// static async getUserData({ email }) {
//     let data = await pool.query(`select * from ${dbtable.USER} where email = ($1)`, [email])
//     return data.rows
// }