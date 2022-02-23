const conndb = require('../conndb.js');
const DB = conndb.DB;

const insert_course_details = async(reqBody, ) => {


    console.log("Inside insert_course_details");
    let { course_name, course_description, status } = reqBody;

    let result = await DB.query("insert into course values (default, $1, $2, $3) returning course_id", [course_name, course_description, status]);
    reqBody.course_id = result[0].course_id;
    // reqBody.status_code = 200;
    return reqBody;


    // } catch (err) {
    //     reqBody.status_code = 500;
    //     reqBody.error = err;
    //     return reqBody;
    // }
}

module.exports.insert_course_details = insert_course_details;