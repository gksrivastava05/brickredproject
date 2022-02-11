const conndb = require('../conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');

const Pool = require('../modelconn');



const updateData = (req) => {
    return new Promise((resolve, reject) => {
        var { id, name, email, birthdate, username, password } = req.body;


        // console.log(req.body.hasOwnProperty('name'));



        // password = bcryptjs.hashSync(password, 10);
        // var updateArr = {
        //     'name': name
        // }

        // connection.query('UPDATE registration SET ? WHERE registration_id = ?', [updateArr, id]).then((updated) => {


        // DB.query('UPDATE registration SET ? WHERE registration_id = ?', [updateArr, id]).then((updated) => {


        DB.query("update registration set name = $1, email = $2, birthdate =$3, username= $4, password = $5  where registration_id = $6", [name, email, birthdate, username, password, id]).then((updated) => {
            req.body.message = 'updated successfully';
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



// static async getUserData({ email }) {
//     let data = await pool.query(`select * from ${dbtable.USER} where email = ($1)`, [email])
//     return data.rows
// }

module.exports.updateData = updateData;


const updateData_v2 = async(req) => {
    if (!req.body.hasOwnProperty("registration_id")) {
        console.log("id is not found");
        req.body.message = "Id property is not found";
        req.body.status_code = 400;
        return req.body;

    } else {
        console.log("else condition");
        var { registration_id, name, email, birthdate, username } = req.body;
        console.log("id, name, email, birthdate, username, password ", registration_id, name, email, birthdate, username)
        var updateArr = {
            'name': name,
            'email': email,
            'birthdate': birthdate,
            'username': username
        }

        // updateArr = JSON.stringify(updateArr);
        console.log("updateArr ", updateArr);

        // DB.query("UPDATE registration SET  ? WHERE registration_id = ?", [updateArr, registration_id]).then((updated) => {
        //     console.log("sucessfully updated")
        // }).catch((error) => {
        //     console.log("Error in update ", error);
        // })

        let updatedata = await new Pool.Registration({
            'name': name,
            'email': email,
            'birthdate': birthdate,
            'username': username

        }).where({ registration_id: req.body.registration_id }).save(null, { method: 'update' });

        console.log("updatedata", updatedata.toJSON());
        return updatedata.toJSON();

    }
}

module.exports.updateData_v2 = updateData_v2;