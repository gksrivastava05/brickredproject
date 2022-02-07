const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3004;
app.use(bodyparse.json());


<<<<<<< HEAD

app.get('/test', (req, res) => {
    console.log("Request body", req.body);
=======
app.get('/test_remote', (req, res) => {
    console.log("Inisde test_remote");
    console.log(req.body);
>>>>>>> 6029c2124cb54ee3e167fd57a5d3fd891e8431b2
    console.log("Hello World");
})

app.listen(port, () => {
    console.log('Server is open on port ', port);
})
