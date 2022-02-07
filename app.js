const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3004;
app.use(bodyparse.json());



app.get('/test', (req, res) => {
    console.log("Request body", req.body);
    console.log("Hello World");
})

app.listen(port, () => {
    console.log('Server is open on port ', port);
})