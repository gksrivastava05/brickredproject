const conndb = require('../conndb.js');
const DB = conndb.DB;

const deleteUserDetails = async (req) => {
    let result 
    result = await DB.query("delete from user_role where user_id = $1", req.params.user_id);
    return "sucessfully delete"
}

module.exports.deleteUserDetails = deleteUserDetails;