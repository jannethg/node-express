const express = require('express');

const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

//create a middle function,  when the server receives request from json formatted data in the body,
//this middleware function will handle parcing .json data into javascript properties, so that we can use that date in javasript
app.use(express.json());

//support for rest api endpoints,
//a routing method thats a catch all for all http verbs,  were going to use this as a response properties on the response object, and
// defaults for all the routing methods for this path, so that we dont set it repeatedly on each one.
// we'll use a path for /campsites here. - so any http request to this path will trigeger this method.

//for the second parameter, we'll pass a callback function for req, rest, next
app.all('/campsites', (req, rest, next) => {
    //well set a response status code of 200 and a header of content type and text plain support.
    // this is saying we're going to send back plain text in response body
    // well call the next function , this function will do is pass control of the application routing to the next relevant routing method after this one.
    // Otherwise it will just stop here and not go any further.
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

//for the next routing method, we'll set up a endpoint for GET request to the path /campsites
// this will also take a callback function req and res
// i don't want to process anymore routing methods after this one, so I don't need to pass the next function into this callback so just the request and response object.
app.get('/campsites', (req, res) => {
    // here its already set by the app.all method, just use the res.end method to send a message body back to the client.
    res.end('Will send all the campsites to you');
});

//next we'll handle a Post for the campsites path after the express server handles the code inside the callback for the app.all method, 
//once it hits the next function,  it will go to the next relevant routing method
//that means if the request that came in was a Post request, then it will go from the app.all method to the App.post method, skpping the App.get method since its not a Get request.
//when you receive a post, the post request will typically some info in the body of the message and we're going to expect that date in json format
// heres teh express.json middleware function  we added earlier comes in, this will take the properties from that json data that's received and automatically sets them up as properties for that request.
// later in the POstman, the request of the json data will have a properties of name and desc so we can expect to access that data here. 
app.post('/campsites', (req, res) => {
    //right now, were just going to echo back that data in a response to the client to send a message body.
    //well add the campsites req.body.name with description
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);

});

//then for a Put request, we will reject the request to this endpoint, so we're going to change the status code to a 403 Error.
// Error code 403 is use when an operational is not supported
// Well end the response with Put operation not supported message.

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /campsites');
});

// this endpoint is for the DELETE operation to campsites.
// this is normally a dangerous operation so you need to make sure you don't allow ordinarry users to do it.
// later on when we use authentication, we can restrict this operations to the users, only the priveleged users only
app.delete('/campsites', (req, res) =>  {
    //well just return a response here 
    res.end('Deleting all campsites');
});

// add a route parameter to the end of the path with /campsites/:campsiteId
// what this will do is allow is allow us to store whatever the client sends as a part of the path after the slash as a router parameter campsiteId
// well use the same path for each of these four methods.


app.get('/campsites/:campsiteId', (req, res) => {
    // if we get a GET request for a specific campsite, then well send this message then teh campsiteId that was request to you.
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

// then for Post, we will support a Post request on this path. but we'll setup a routing method to at least respond to Post request.

app.post('/campsites/:campsiteId', (req,res) =>{
    //we'll set a status code 403
    //then send a message back not supported for /:campsiteId
    res.sendStatus = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});


// We will support a PUT request for a specific campsite ID.
// we're going to send a multiline response 
app.put('/campsites/:campsiteId', (req, res) => {
    // we'll write to the body with this message followed by a /n which will cause a new line of the body
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    // we'll need to end a response and well attach another part of the message body
    //then thanks to the body parts for middleware, we can use the req.body.name property and description property
    // instead it will send as a Json formatted body of the request message then echoing back in our response as text
    res.end(`We'll update the campsite: ${req.body.name} with description: ${req,body.description}`);
});


//for the delete method, we will setup a route to /campsites/:campsiteId and pass a callback with a parameters call req and res
app.delete('/campsites/:campsiteId', (req, res) => {
    // well say deleting campsite, this endpoit will be used for deleting specifing campside
    res.end(`Deleting campsite: ${req,params.campsiteId}`);
});


app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})




