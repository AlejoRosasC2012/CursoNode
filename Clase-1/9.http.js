const http = require('http');
const process = require('process');
const { findAvailablePort } = require('./10.free-port.js');

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    res.end('Hello, World!');
});

findAvailablePort(desiredPort)
    .then(port => {
        server.listen(port, () => {
            console.log(`Server is listening on port http://localhost:${port}`);
        })
    }) 