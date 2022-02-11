const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const port = 3004;
app.use(bodyParser.json());

app.set('view engine', "ejs");
app.use(express.static("public"));

const controller = require('./Controller/controller');
const auth = require('./middleware/auth.js')
const validation = require('./middleware/validation_middleware.js');
const logout_auth = require('./middleware/logout');

const callfn = (req) => {
    let str = '';
    return new Promise((resolve, rejects) => {
        setTimeout((reqBody) => {
            str = 'Hello ' + reqBody.body.name + ' I am using GitHub';
            resolve(str);
        }, 1000, req);
    });
}


app.post('/test_remote', async(req, res) => {
    try {
        console.log("Inisde test_remote");
        console.log(req.body);
        const result = await callfn(req);
        res.status(200).send(result);
    } catch (err) {
        res.status(401).send(err);
    }
})

app.get('/login', (req, res) => {
    res.render('loginform');
})



//user login...
app.post('/user_login', validation.signIn, controller.userLogin);

//get All User...
app.get('/get_user', auth.authuser, controller.getAllUsers);

//user Registration...
app.post('/userregister', validation.signUp, controller.userRegistration);

//update user data..
app.put('/update_user_data', validation.update_validation, controller.updateUserData);

//logout..
app.get('/user_logout', logout_auth.logout_mid, controller.logoutuser);

app.listen(port, () => {
    console.log('Server is open on port ', port);
});