const validator = require('../helpers/validate');


const courseValidation = (req, res, next) => {

    const validationRule = {
        //     "username": ['required', 'string', 'regex:^[A-Za-z][A-Za-z0-9_]{3,29}$'],
        //     "password": ["required", 'regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,16}$/']
        "course_name": "required|string",
        "course_description": "required|string",
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

module.exports.courseValidation = courseValidation;