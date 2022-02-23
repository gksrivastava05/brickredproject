const conndb = require('../conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');

const Pool = require('../modelconn');
const Format = require('pg-format');


const updateData = (req) => {
    return new Promise((resolve, reject) => {
        var { id, name, email, birthdate, username, password } = req.body;


        // console.log(req.body.hasOwnProperty('name'));



        // password = bcryptjs.hashSync(password, 10);
        // var updateArr = {
        //     'name': name
        // }

        // connection.query('UPDATE registration SET ? WHERE user_id = ?', [updateArr, id]).then((updated) => {


        // DB.query('UPDATE registration SET ? WHERE user_id = ?', [updateArr, id]).then((updated) => {


        DB.query("update user_tb set name = $1, email = $2, birthdate =$3, username= $4, password = $5  where user_id = $6", [name, email, birthdate, username, password, id]).then((updated) => {
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


const updateData_v2_old = async(req) => {
    if (!req.body.hasOwnProperty("user_id")) {
        console.log("id is not found");
        req.body.message = "Registration Id property is not found";
        req.body.status_code = 400;
        return req.body;

    } else {

        console.log("else condition");

        var { user_id, name, email, birthdate, username } = req.body;
        console.log("user_id, name, email, birthdate, username, password ", user_id, name, email, birthdate, username)

        var istdate = new Date(new Date().getTime() + (5 * 60 + 30) * 60000);
        console.log("Time -> ", istdate.toISOString());
        let nowDate = istdate.toISOString();

        var sampleObject = {
            name: name,
            email: email,
            birthdate: birthdate,
            username: username,
            updatedtime: nowDate
        }


        let sets = [];

        for (let key in sampleObject) {
            if (sampleObject[key] != undefined)
                sets.push(Format('%I = %L', key, sampleObject[key]));
        }
        console.log("setssss -> ", sets);

        let setStrings = sets.join(',');
        console.log("set-> ", setStrings);

        const query = Format('UPDATE user_tb SET %s WHERE user_id = %L returning user_id,name, email ,username', setStrings, user_id);
        console.log("query --> ", query);
        const result = await DB.query(query);
        console.log("Successfully updated ", result[0]);
        result[0].message = 'successfull updated'

        return result[0];






        // let text = JSON.stringify(sampleObject);
        // // let qrystr = Format(UPDATE user_tb SET % s WHERE user_id = % L);


        // DB.query(query).then((result) => {
        //     console.log("Sucessfully updated ")
        // }).catch((error) => {
        //     console.log("Somthing error", error);
        // })



        // DB.query(qrystr, [name, user_id]).then((updated) => {
        //     console.log("sucessfully updated")
        // }).catch((error) => {
        //     console.log("Error in update ", error);
        // })





        // updateArr = JSON.stringify(updateArr);
        // console.log("updateArr ", updateArr);

        // DB.query("UPDATE registration SET  ? WHERE user_id = ?", [updateArr, user_id]).then((updated) => {
        //     console.log("sucessfully updated")
        // }).catch((error) => {
        //     console.log("Error in update ", error);
        // })

        // let str = "UPDATE registration " +
        //     "SET name = ? " +
        //     "WHERE user_id = ?";

        // let result = DB.

        // let nowDate = new Date();
        // let iso = nowDate.toISOString();
        // console.log("nowDate iso ", iso);
        // const d = new Date(iso);
        // console.log("d ", d);

        // var istdate = new Date(new Date().getTime() + (5 * 60 + 30) * 60000);
        // // var [date, restdata] = istdate.toISOString().split("T");
        // console.log("Time -> ", istdate.toISOString());
        // let nowDate = istdate.toISOString();


        // let updatedata = await new Pool.Registration({
        //     'name': name,
        //     'email': email,
        //     'birthdate': birthdate,
        //     'username': username,
        //     'updatedtime': nowDate

        // }).where({ user_id: req.body.user_id }).save(null, { method: 'update' });

        // console.log("updatedata", updatedata.toJSON());
        // return updatedata.toJSON();

    }
}




const updateData_v2 = async(req) => {
    if (!req.body.hasOwnProperty("user_id")) {
        console.log("id is not found");
        req.body.message = "Registration Id property is not found";
        req.body.status_code = 400;
        return req.body;

    } else {

        let checkUser = await DB.query("select * from user_tb where user_id = $1 ", req.body.user_id);

        console.log("check user ", checkUser.length);
        if (checkUser.length > 0) {
            console.log("else condition");

            var { user_id, name, email, birthdate, username } = req.body;
            console.log("user_id, name, email, birthdate, username, password ", user_id, name, email, birthdate, username)

            var istdate = new Date(new Date().getTime() + (5 * 60 + 30) * 60000);
            console.log("Time -> ", istdate.toISOString());
            let nowDate = istdate.toISOString();

            var sampleObject = {
                name: name,
                email: email,
                birthdate: birthdate,
                username: username,
                updatedtime: nowDate
            }


            let sets = [];

            for (let key in sampleObject) {
                if (sampleObject[key] != undefined)
                    sets.push(Format('%I = %L', key, sampleObject[key]));
            }
            console.log("setssss -> ", sets);

            let setStrings = sets.join(',');
            console.log("set-> ", setStrings);

            const query = Format('UPDATE user_tb SET %s WHERE user_id = %L returning user_id,name, email ,username', setStrings, user_id);
            console.log("query --> ", query);

            const result = await DB.query(query);

            console.log("Successfully updated ", result[0]);
            result[0].message = 'successfull updated'

            return result[0];

        } else {
            let mess = {};
            mess.message = "User id is not valid"
            return mess;
        }

    }
}


module.exports.updateData_v2 = updateData_v2;