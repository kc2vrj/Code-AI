const http = require('http');
const querystring = require('querystring');
const url = require('url');

// Define the MyClassificationPipeline class
class MyClassificationPipeline {
    static async getInstance() {
        const { pipeline } = await transformersPromise;
        return pipeline('text-classification', 'bigcode/starcoder2-7b');
    }
}

// Define the HTTP server
const server = http.createServer();
const hostname = '0.0.0.0';
const port = 3000;

// Listen for requests made to the server
server.on('request', async (req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url);

    // Extract the query parameters
    const { text } = querystring.parse(parsedUrl.query);

    // Set the response headers
    res.setHeader('Content-Type', 'application/json');

    let response;
    if (parsedUrl.pathname === '/classify' && text) {
        const classifier = await MyClassificationPipeline.getInstance();
        response = await classifier(text);
        res.statusCode = 200;
    } else {
        response = { 'error': 'Bad request' }
        res.statusCode = 400;
    }

    // Send the JSON response
    res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});