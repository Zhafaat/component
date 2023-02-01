const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req);

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    res.write('<head><link rel="styleseet" href="#"></head>');
    res.write('<p>hello, zhafaat</p>');
    res.write('<p>hello again, zhafaat</p>');
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});