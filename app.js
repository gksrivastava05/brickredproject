const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const port = 3004;
app.use(bodyParser.json());

app.set('view engine', "ejs");
app.use(express.static("public"));

const route = require('./route');


const callfn = (req) => {
    let str = '';
    return new Promise((resolve, rejects) => {
        setTimeout((req) => {
            str = 'Hello ' + req.body.name + ' I am using GitHub';
            resolve(str);
        }, 1000, req);
    });
}


// <<<<<<< HEAD

// app.get('/test', (req, res) => {
//     console.log("Request body", req.body);
// =======
app.post('/test_remote', async(req, res) => {
    try {
        console.log("Inisde test_remote");
        console.log(req.body);
        // >>>>>>> 6029c2124cb54ee3e167fd57a5d3fd891e8431b2

        const result = await callfn(req);
        res.status(200).send(result);
    } catch (err) {
        res.status(401).send(err);
    }
})

app.get('/login', (req, res) => {
    res.render('loginform');
})

app.post('/user_login', route.userLogin);

app.listen(port, () => {
    console.log('Server is open on port ', port);
});