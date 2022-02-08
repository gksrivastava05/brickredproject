const jwt = require('jsonwebtoken');

const authuser = function(req, res, next) {
    try {
        let token = req.body.token;
        console.log("Inside authuser ", token);
        const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
        console.log("in authuser function->  ", verifyuser);
        req.body.username = verifyuser.username;
        req.body.use_id = verifyuser.user_id;
        next();

    } catch (error) {
        res.status(401).send(error)

    }
}

module.exports.authuser = authuser;