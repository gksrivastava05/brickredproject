const express = require('express');
const app = express();
const port = 3004;


app.get('/', (req, res) => {
    console.log("Hello World");
})

app.listen(port, () => {
    console.log('Server is open on port ', port);
})