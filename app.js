const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const port = 3004;
app.use(bodyParser.json());

app.set('view engine', "ejs");
app.use(express.static("public"));

const controller = require('./Controller/controller');
const auth = require('./middleware/auth.js')
const validation = require('./middleware/validation_middleware.js');
const logout_auth = require('./middleware/logout');
const fileValidate = require('./middleware/fileUploadValidate');
const courseValidate = require('./middleware/course_validate');
const enrollmentValidate = require('./middleware/enrollement_validate');
const idValidate = require('./middleware/userIdValidate');
const sendEmailValidation = require('./middleware/sendEmailValidate');

const callfn = (req) => {
    let str = '';
    return new Promise((resolve, rejects) => {
        setTimeout((reqBody) => {
            str = 'Hello ' + reqBody.body.name + ' I am using GitHub';
            resolve(str);
        }, 1000, req);
    });
}


app.post('/test_remote', async(req, res) => {
    try {
        console.log("Inisde test_remote");
        console.log(req.body);
        const result = await callfn(req);
        res.status(200).send(result);
    } catch (err) {
        res.status(401).send(err);
    }
})

app.get('/login', (req, res) => {
    res.render('loginform');
})



//user login...
app.post('/user_login', validation.signIn, controller.userLogin);

//get All User...
app.get('/get_user', auth.authuser, controller.getAllUsers);

//user Registration...
app.post('/userregister', validation.signUp, controller.userRegistration);

//update user data..
app.put('/update_user_data', validation.update_validation, controller.updateUserData);

//logout..
app.get('/user_logout', logout_auth.logout_mid, controller.logoutuser);

app.post('/file_upload', controller.fileUpload);

app.post('/insert_course', courseValidate.courseValidation, controller.insertCourseDetails);

app.post('/insert_enrollment', enrollmentValidate.enrollemntValidation, controller.insertUserEnrollment);

app.get('/get_user_details_by_id/:user_id', idValidate.IDValidation, controller.getUserDetailsByID);


//get all user exam marks or particual user exam marks...
app.get('/get_user_exam_marks', idValidate.userIdvalidation, controller.getAllUserExamMarks);

// app.get('/get_user_marks_by_id/:user_id', idValidate.IDValidation, controller.getUserMarksById);

app.get('/send_mail', controller.usersendmail);
app.post('/send_mail_dynamic', controller.sendMailDynamically);

app.post('/send_mail_by_file', controller.sendMailByFile);
app.delete('/delete_user_details/:user_id', idValidate.IDValidation ,controller.deleteUserData);

app.listen(port, () => {
    console.log('Server is open on port ', port);
});