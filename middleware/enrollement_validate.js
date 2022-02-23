const validator = require('../helpers/validate');


const enrollemntValidation = (req, res, next) => {

    const validationRule = {

        "user_id": "required|integer|min:4",
        "course_id": "required|integer|min:4",
        "status": "required"
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

module.exports.enrollemntValidation = enrollemntValidation;