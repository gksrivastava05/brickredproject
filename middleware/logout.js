const jwt = require('jsonwebtoken');


const logout_mid = function(req, res, next) {
    try {
        console.log(req.headers);
        let token = req.headers.authorization.split(" ")[1];
        console.log("Inside logout_mid ", token);
        const verifyuser = jwt.verify(token, process.env.SECRET_KEY, { expiresIn: "1ms" });
        console.log("in logout_mid function->  ", verifyuser);

        next();

    } catch (error) {
        console.log("error in logout middleware ", error);
        res.status(401).send(error)

    }
}

module.exports.logout_mid = logout_mid;