const conndb = require('../conndb.js');
const DB = conndb.DB;

const insertEnrollmentInDb = async(reqBody) => {
    // try {
    console.log("Inside insertEnrollmentInDb ");
    let { user_id, course_id, status } = reqBody;
    let enrollmentinsert = await DB.query("insert into enrollment values (default, $1, $2, $3) returning enrollment_id", [user_id, course_id, status]);
    console.log("enrollment id ", enrollmentinsert);
    reqBody.enrollment_id = enrollmentinsert[0].enrollment_id;
    return reqBody;
    // } catch (err) {
    //     reqBody.status_code = 500;
    //     reqBody.error = err;
    //     return reqBody;
    // }
}



module.exports.insertEnrollmentInDb = insertEnrollmentInDb;