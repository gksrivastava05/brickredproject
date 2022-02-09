const validator = require('../helpers/validate');

const signIn = (req, res, next) => {
    const validationRule = {
        "username": "required|string",
        "password": "required|string|min:8",
    }


    validator(req.body, validationRule, {}, (err, status) => {
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

module.exports.signIn = signIn;