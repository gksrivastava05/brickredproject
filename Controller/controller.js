require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());

const conndb = require('../conndb');
const DB = conndb.DB;
const bcryptjs = require('bcryptjs');
const User = require('../model/login');
const UserRegistration = require('../model/register');
const UserUpdate = require('../model/update');


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
                expiresIn: '1h'
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

const updateUser = async(req, res) => {
    try {
        console.log("Inside updateUser", req.body, req.params);
        const result = await UserUpdate.updateData(req, req.params.id);
        console.log("Final result", result);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}

module.exports.updateUser = updateUser;