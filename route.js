const express = require('espress');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());


const userLogin = (req, res) => {
    console.log("Request body ", req.body);
}