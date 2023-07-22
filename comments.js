// create a web server with node.js
// 1. load http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// 2. create http server
var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource = ' + resource);

    // if client request '/', response index.html
    if(resource == '/') {
        var html = fs.readFileSync('index.html', 'utf-8');
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(html);
    } else if(resource == '/comments') {
        if(request.method == 'POST') {
            console.log('POST request');
            request.on('data', function(data) {
                var parsedQuery = qs.parse(data.toString());
                var comment = parsedQuery['comment'];
                console.log('comment = ' + comment);
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end('var1 = ' + comment);
            });
        } else {
            console.log('GET request');
            var html = fs.readFileSync('comment.html', 'utf-8');
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(html);
        }
    } else {
        response.writeHead(404, {'Content-Type':'text/html'});
        response.end('404 Not Found');
    }
});

// 3. listen port
server.listen(8080, function() {
    console.log('Server is running...');
});