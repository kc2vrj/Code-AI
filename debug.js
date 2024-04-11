// Middleware function to log request information
function requestLogger(req) {
        console.log("Received a request:");
        console.log("Method:", req.method);
        console.log("URL:", req.originalUrl);
        console.log("Query Parameters:", req.query);
        console.log("Request Body:", req.body);
    }
    
    // Middleware function to log response information
    function responseLogger(res) {
        console.log("Sent a response:");
        console.log("Status Code:", res.statusCode);
    }
    
    // Simulating a request and response for demonstration
    const req = {
        method: 'GET',
        originalUrl: '/example',
        query: { key: 'value' },
        body: { message: 'Hello' }
    };
    
    const res = { statusCode: 200 };
    
    // Log request information using the requestLogger middleware
    requestLogger(req);
    
    // Log response information using the responseLogger middleware
    responseLogger(res);