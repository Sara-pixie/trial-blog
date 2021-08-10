const http = require('http');
const fs = require('fs');

//When request is made
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    //figure out the path
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        //redirect option
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        //default 404 page
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    
    //send an HTML file
    fs.readFile(path, (err, data) => {
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

