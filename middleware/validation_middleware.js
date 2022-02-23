const validator = require('../helpers/validate');

const signIn = (req, res, next) => {
    const validationRule = {
        "username": ['required', 'string', 'regex:^[A-Za-z][A-Za-z0-9_]{3,29}$'],
        "password": ["required", 'regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,16}$/']
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
        // "username": "required|string|min:3",
        "username": ['required', 'string', 'regex:^[A-Za-z][A-Za-z0-9_]{3,29}$'],
        // "password": "required|string|min:5|confirmed"
        "password": ["required", 'regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,16}$/', 'confirmed']
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


/**************
 * ***************** Update validation 
 ******/


//, 'regex:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
// 'regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/'

const update_validation = (req, res, next) => {
    console.log("Inside update middleware");

    const validationRules = {
        "user_id": "required|integer",
        "name": "string|min:3",
        "email": "email",
        "birthDate": {
            type: Date,
        },
        // "username": "required|string|min:3",
        "username": ['string', 'regex:^[A-Za-z][A-Za-z0-9_]{3,29}$']
            // "password": ['required', 'string', 'min:5']
            // "password": ['regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/']
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

module.exports.update_validation = update_validation;