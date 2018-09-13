/* 
 * Description: Pirple NodeJS Homework Assignment #1
 * Primary file for Restful API with endpoint /hello
 * to return message to user.
 * 
 */

 // Dependencies
var http = require('http');
var url = require('url');

// Define Ports
var httpPort = 3333

 // Setup HTTP Server
var httpServer = http.createServer(function(req,res){
    unifiedServer(req,res);
});

 // Start HTTP Server
httpServer.listen(httpPort,function(){
    console.log("The HTTP server is listening on port " +httpPort);
});

 // Server logic
var unifiedServer = function(req,res){
    // Parse the URL
    var parsedUrl = url.parse(req.url, true);

    // Get the URL path and trim slashes
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Choose the appropriate handler or default to notFound handler
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    var data = {};

    console.log("Path requested: " +trimmedPath);

    chosenHandler(data,function(statusCode,payload){
        statusCode = typeof(statusCode) == 'number' ? statusCode : '200';

        payload = typeof(payload) == 'object' ? payload : {};

        // var stringifiedPayload = JSON.stringify(payload);


        // Return the response
        res.writeHeader(statusCode);
        res.end(payload.response);

        console.log("Returning this response: ", statusCode,payload);
    });

    // Call the choseHandler and route 


};

// Handlers
var handlers = {};

handlers.hello = function(data,callback){
    var greeting = '<h2>Welcome to my page!</h2>'
    var htmlCode = '<html><body>'+greeting+'</body></html>'
    
    callback(200, {'response' : htmlCode });
};

handlers.notFound = function(data,callback){

    callback(404,{'response' : 'Page Not Found'});
};

// Request router
var router = {
    'hello' : handlers.hello
};