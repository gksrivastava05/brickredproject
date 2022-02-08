require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());

const conndb = require('./conndb.js');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');

const checkUserLogin = (reqBody, callback) => {
    console.log('Inside checkUserLogin');
    var message_part = {};

    DB.query("select * from login_user where username = $1", reqBody.username).then((user) => {
        console.log("User ", user);
        if (user < 1) {
            message_part = {
                message: "Authentication Faild"
            }
            callback(message_part);
        } else {
            console.log("else part")
            bcryptjs.compare(reqBody.password, user[0].password, function(err, result) {
                if (err) {
                    console.log("if condition", err);
                    message_part = {
                        message: "Authentication Failed"
                    }
                    callback(message_part);
                }

                if (result) {
                    var token = jwt.sign({
                            username: user[0].username,
                            user_id: user[0].login_id
                        },
                        process.env.SECRET_KEY, {
                            expiresIn: '1h'
                        }
                    );


                    user[0].status = 200;
                    user[0].message = "Sucessfull";
                    user[0].token = token;

                    console.log(user[0]);
                    callback(user[0]);
                }
            })
        }
    }).catch((error) => {
        console.error("Error in findUserfromDb ", error);

        callback(error)
    });
}


const userLogin = (req, res) => {
    console.log("Request body ", req.body);
    checkUserLogin(req.body, (result) => {
        res.send(result);
    })
}

module.exports.userLogin = userLogin;