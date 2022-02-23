require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());

const multer = require('multer');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');



const conndb = require('../conndb');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');
const User = require('../model/login');
const UserRegistration = require('../model/register');
const UserUpdate = require('../model/update');
const commanUpload = require('../helpers/comman');
const course = require('../model/course');
const enrollment = require('../model/enrollment');
const getUserDetails = require('../model/getUser');
const userMarks = require('../model/userExamMarks');
const template = require('../model/template');


const userLogin = async(req, res) => {
    try {
        console.log("Request body ", req.body);
        var userInfo = await User.checkUserCredential(req.body);
        console.log("route ", userInfo);
        var token = jwt.sign({
                username: userInfo.username,
                user_id: userInfo.login_id
            },
            process.env.SECRET_KEY, {
                expiresIn: '7h'
            }
        );
        userInfo.message = "Sucessfull";
        userInfo.token = token;
        res.send(userInfo);
    } catch (error) {
        res.send(error);
    }

}

module.exports.userLogin = userLogin;

/***** Get All User */
const getAllUsers = async(req, res, next) => {
    try {
        console.log("Inside getAllUsers function");

        const getUser = await User.getAllUser();
        console.log(getUser);
        res.send(getUser);
    } catch (error) {
        console.log("error in route file", error);
        res.send(error);
    }

}

module.exports.getAllUsers = getAllUsers;


/*** Register User */
const userRegistration = async(req, res) => {
    try {
        console.log("Inside userRegistration");
        const user_register_db = await UserRegistration.insertNewUser(req);
        res.send(user_register_db);
    } catch (error) {
        console.log("Error", error);
        res.send(error);
    }
}

module.exports.userRegistration = userRegistration


/*** Update User Data */
const updateUserData = async(req, res) => {
    try {
        console.log("Inside updateUser", req.body);
        const result = await UserUpdate.updateData_v2(req);
        console.log("Final result", result);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}

module.exports.updateUserData = updateUserData;

const logoutuser = (req, res) => {
    res.send("Successfully Logout");
}

module.exports.logoutuser = logoutuser;


const uploadDb = require('../model/upload_model');


const fileUpload = (req, res, next) => {

    console.log("I am in fileUpload function file ");
    const upload = commanUpload.uploading_file(req);
    upload(req, res, function(err) {
        console.log("upload request file -> ", req.files);
        if (err) {
            console.log("errror are ", err);
            res.send(err);
        } else {
            if (req.files != undefined) {
                console.log("File Upload", req.files)
                uploadDb.uploadInDB(req.files);

                res.send("File uploaded");
            } else {
                res.status(400).send('Please choose the files')
            }

        }
    });

}

module.exports.fileUpload = fileUpload;

const insertCourseDetails = async(req, res) => {
    try {
        console.log("I am in insertCourseDetails function ", req.body);
        const course_data = await course.insert_course_details(req.body);
        console.log("Final results ", course_data);
        res.status(200).send(course_data);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.insertCourseDetails = insertCourseDetails;

const insertUserEnrollment = async(req, res) => {
    try {
        console.log("Inside insertUserEnrollment function ", req.body);
        const result = await enrollment.insertEnrollmentInDb(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.insertUserEnrollment = insertUserEnrollment;



const getUserDetailsByID = async(req, res) => {
    try {
        console.log("Inside getUserDetailsByID ", req.params)
        let obj = {};
        const getUser = await getUserDetails.getUserById(req.params);
        if (getUser.length > 0) {
            obj.user = getUser;
            const getrole = await getUserDetails.getUserRole(req.params);
            obj.user_role = getrole;

            const user_enrollment = await getUserDetails.getUserEnrollment(req.params);
            obj.user_enrollment = user_enrollment;
            console.log("get user ", obj);
            res.send(obj);
        } else {
            let msg = {};
            msg.success = false;
            msg.message = "Id not found";
            res.status(400).send(msg);
        }

    } catch (error) {
        res.send(error);
    }
}

module.exports.getUserDetailsByID = getUserDetailsByID;


/*********
 ********************** get all user or single user exam marks...
 */

const getAllUserExamMarks = async(req, res) => {
    try {
        console.log("I am in getAllUserExamMarks-> ", req.query.user_id);
        if (req.query.user_id == undefined) {
            console.log("if condition ")
            const allusermarks = await userMarks.alluserExamMarks();
            console.log(allusermarks);
            res.status(200).send(allusermarks);
        } else {
            console.log("I am in getAllUserExamMarks else -> ", req.query);

            const usermarks = await userMarks.userExamMarks(req);
            console.log("user marks ", usermarks);
            console.log("length ", usermarks.length);
            if (usermarks.length > 0) {
                res.status(200).send(usermarks);
            } else {
                let arr = [];
                let msg = {};
                msg.success = false;
                msg.message = "Data Not Found";
                arr.push(msg);
                res.status(400).send(arr);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.getAllUserExamMarks = getAllUserExamMarks;

/***************************** End of get user exam marks .....*********************** */


const getUserMarksById = async(req, res) => {
    try {
        console.log("Inside getUserMarksById function ", req.params);
        const usermarks = await userMarks.userExamMarks(req);
        console.log("length ", usermarks.length);
        if (usermarks.length > 0) {
            res.status(200).send(usermarks);
        } else {
            let arr = [];
            let msg = {};
            msg.success = false;
            msg.message = "Data Not Found";
            arr.push(msg);
            res.status(400).send(arr);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.getUserMarksById = getUserMarksById;




const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

const usersendmail = async(req, res) => {
    try {
        console.log("I'm in sendMail function");

        const mailOption = {
            from: 'gksrivastava05@gmail.com',
            to: 'gksrivastava05@gmail.com',
            subject: 'test mail',
            text: 'This mail is for testing puprose',
            attachments: [{
                filename: 'linuxcommands.pdf',
                path: '/home/gaurav/Documents/linuxcommands.pdf',
                content: 'command'
            }]
        }

        let info = await transporter.sendMail(mailOption);
        console.log(info);
        res.send("mail successfully send")
    } catch (error) {
        console.log(error);
        res.status(535).send(error);
    }
}

module.exports.usersendmail = usersendmail;


const sendmail = async(template_str, replacement) => {
    let info;
    var tempt = handlebars.compile(template_str);
    var htmltosend = tempt(replacement)
    const mailOption = {
        from: 'gksrivastava05@gmail.com',
        to: 'gksrivastava05@gmail.com',
        subject: 'test mail',
        // text: 'This mail is for testing puprose',
        html: htmltosend
    }

    info = await transporter.sendMail(mailOption);
    return info;

}



const sendMailDynamically = async(req, res) => {
    try {
        console.log("Inside sendMailDynamically function", req.body);

        const data = await template.getTemplate(req);
        console.log(data[0].tempate);
        var replacement = {
            "name": req.body.name,
            "date": req.body.date,
            "designation": req.body.designation,
            "signature": req.body.signature,
            "managersName": req.body.managersName,
            "jobTitle": req.body.jobTitle,
            "companyName": req.body.companyName,
            "dateOfLastDay": req.body.dateOfLastDay,
            "timeInEmployment": req.body.timeInEmployment,
            "noticePeriodInWeeks": req.body.noticePeriodInWeeks
        }

        let info = await sendmail(data[0].tempate, replacement);
        res.send(info);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports.sendMailDynamically = sendMailDynamically;

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '../', 'views');


const sendMailByFile = async(req, res) => {
    try {
        console.log("Inside sendMailByFile function ");
        console.log("current directory ", directoryPath);

        const replacement = {
            "name": req.body.name,
            "managersName": req.body.managersName,
            "jobTitle": req.body.jobTitle,
            "companyName": req.body.companyName,
            "dateOfLastDay": req.body.dateOfLastDay,
            "timeInEmployment": req.body.timeInEmployment,
            "noticePeriodInWeeks": req.body.noticePeriodInWeeks
        }

        const templateStr = fs.readFileSync(path.resolve(directoryPath, 'release.hbs')).toString('utf8');

        let info = await sendmail(templateStr, replacement);

        res.send(info);

    } catch (error) {

    }
}

module.exports.sendMailByFile = sendMailByFile;