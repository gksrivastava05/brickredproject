const validator = require('../helpers/validate');


const IDValidation = (req, res, next) => {
    console.log("Inside IDValidation function")
    const validationRule = {

        "user_id": "required|integer|min:3"
    }


    validator(req.params, validationRule, {}, (err, status) => {
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

module.exports.IDValidation = IDValidation;

const userIdvalidation = (req, res, next) => {
    console.log("Inside userIdvalidation", req.query.user_id);
    const validationRule = {

        "user_id": "required|integer|min:3"
    }

    if (req.query.user_id != undefined) {
        validator(req.query, validationRule, {}, (err, status) => {
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
    } else {
        next();
    }
}

module.exports.userIdvalidation = userIdvalidation;