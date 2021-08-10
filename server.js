const http = require('http');

//When request is made
const server = http.createServer((req, res) => {
    console.log('request made');
});

//server is listening for requests
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

