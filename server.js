const http = require('http');
const fs = require('fs');

//When request is made
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');
    
    //send an HTML file
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data); - not needed since we're returning just one thing...
            res.end(data);
        }
    })
});

//server is listening for requests
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

