const conndb = require('../conndb.js');
const DB = conndb.DB;


const getTemplate = async(req) => {
    let result;
    result = await DB.query("select * from mail_template where mail_template_id = $1", req.body.mail_template_id);
    return result;
}

module.exports.getTemplate = getTemplate