const http = require('http');

//When request is made
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Hello, World!</h1>');
    res.write('<p>This is how we get started</p>');
    res.end();
});

//server is listening for requests
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

