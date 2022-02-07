const express = require('express');
const app = express();
const port = 3004;


app.get('/test_remote', (req, res) => {
    console.log("Inisde test_remote");
    console.log(req.body);
    console.log("Hello World");
})

app.listen(port, () => {
    console.log('Server is open on port ', port);
})
