const jwt = require('jsonwebtoken');
const conndb = require('../conndb');
const DB = conndb.DB;


const authuser = function(req, res, next) {
    try {
        console.log(req.headers);
        let token = req.headers.authorization.split(" ")[1];
        console.log("Inside authuser ", token);
        const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
        console.log("in authuser function->  ", verifyuser);

        next();

    } catch (error) {
        res.status(401).send(error)

    }
}

module.exports.authuser = authuser;