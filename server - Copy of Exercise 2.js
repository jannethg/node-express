const express = require('express');

// require morgan
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();

//insert morgan middle with the argument of dev
app.use(morgan('dev'));

//we'll use app.use once again and pass it to middleware function of express.static
// and we'll give an argument which will be dirname and /public
// the __dirname is a special variable in node, it will refer to the absolute path of the current directory of the file that's its in
// this single linke serve static files from the public folder
app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
   // console.log(req.headers);  we wll no longer need this coz Morgan will handle this req info
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})




