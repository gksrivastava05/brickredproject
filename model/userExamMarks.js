const conndb = require('../conndb.js');
const DB = conndb.DB;

const alluserExamMarks = async() => {
    console.log("Inside alluserExamMarks");

    const allmarks = DB.query("select ue.user_id, name, email, exam, ue.exam_master_id , count(em.exam_master_id) as total_attempts,(count(em.exam_master_id)- sum(marks)) as wrong,  sum(marks) as marks from user_eaxm ue, exam_master em , user_tb ut where  ue.exam_master_id = em.exam_master_id and  ut.user_id = ue.user_id  group by ue. exam_master_id, exam, ue.user_id, name, email order by ue.user_id");

    console.log("allmarks");
    return allmarks;
}

module.exports.alluserExamMarks = alluserExamMarks;

const userExamMarks = async(req) => {
    console.log("Inside userExamMarks", req.query.user_id);

    const marks = await DB.query("select ue.user_id, name, email, exam, ue.exam_master_id , count(em.exam_master_id) as total_attempts, (count(em.exam_master_id)- sum(marks)) as wrong, sum(marks) as marks from user_eaxm ue, exam_master em , user_tb ut where ue.user_id = $1 and ue.exam_master_id = em.exam_master_id and  ut.user_id = ue.user_id  group by ue. exam_master_id, exam, ue.user_id, name, email order by ue.user_id", req.query.user_id);

    console.log("marks ", marks);
    return marks;
}

module.exports.userExamMarks = userExamMarks;