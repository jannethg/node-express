//since express is not a core, since its been install to core modules, we don't need to give a file path
// we don't have to tell node to look in node modules for express
const express = require('express');


const hostname = 'localhost';
const port = 3000;

//const express function will return an express server application
const app = express();

//setup a server
//req - request function, res - request, and next which is a function (we won't use a next function here).
app.use((req, res) => {
    console.log(req.headers);
    //set up the response status code to 200
    //set header method to setHeader of content type
    // We'll also use res.End and give it a body method
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

//In order to create an Server and start listening to it
// which will both create an instance http server class and start listening to it.

// well provide a Port and hostname, and a callback function to console log
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})


