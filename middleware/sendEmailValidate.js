const validator = require('../helpers/validate');


const emailValidation = (req, res, next) => {

    const validationRule = {

        "name": "string",
        "date": {
            type: Date

        },
        "designation": "string",
        "signature": "string",
        "managersName": "string",
        "jobTitle": "string",
        "companyName": "string",
        "dateOfLastDay": { type: Date }

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

module.exports.emailValidation = emailValidation;