const conndb = require('../conndb.js');
const DB = conndb.DB;

const getUserById = async(reqparams) => {

    console.log("Inside getUserById", reqparams.user_id)
    const user = await DB.query('select user_id, name, email, birthdate, username from user_tb where user_id = $1', reqparams.user_id);
    console.log("Succefully get user");

    return user;

}

module.exports.getUserById = getUserById;

const getUserRole = async(reqparams) => {

    console.log("Inside getUserRole function ", reqparams);
    const getRole = await DB.query("select ur.user_id, role_name, rmt.status, rmt.createdby , rmt.role_master_id, user_role_id from role_master_tb rmt, user_role ur where rmt.role_master_id in (select role_master_id from user_role where user_id = $1) and rmt.role_master_id = ur.role_master_id", reqparams.user_id);

    console.log("get user role")
    return getRole;

}

module.exports.getUserRole = getUserRole;



const getUserEnrollment = async(reqparams) => {

    console.log("Inside getUserEnrollment ", reqparams);
    const getEnrollment = await DB.query("select enrollment_id, user_id, c. course_id, course_name, course_description , c.status from enrollment e, course c where c.course_id in (select course_id from enrollment where user_id = $1) and c.course_id = e.course_id", reqparams.user_id);

    console.log("get Enrollment");
    return getEnrollment;

}

module.exports.getUserEnrollment = getUserEnrollment;