const validator = require('../helpers/validate');

const signIn = (req, res, next) => {
    const validationRule = {
        "username": "required|string",
        "password": "required|string|min:5",
    }


    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            console.log("Error in sigin validation ", err);
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports.signIn = signIn;

const signUp = (req, res, next) => {
    console.log("user register validation function")
    const validationRules = {
        "name": "required|string",
        "email": "required|email",
        "birthDate": {
            type: Date,
            required: true
        },
        "username": "required|string",
        "password": "required|string|min:5|confirmed"
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports.signUp = signUp;

const update_middleware = (req, res, next) => {
    console.log("Inside update middleware");

    const validationRules = {
        "name": "string",
        "email": "email",
        "birthDate": {
            type: Date,
            required: true
        },
        "username": "string",
        "password": "string|min:5"
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports.update_middleware = update_middleware;