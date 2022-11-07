let http = require("http");
let ws = require("ws");

let port = 8000;

let Apple = 0;
let Google = 0;

// For http clients
let server = http.createServer((req,res)=>{
    res.end("I m broadcasting from WebSocket Server.");
});

// For socket clients
let socket = new ws.Server({server});

// Event for connection establishment with a websocket client
socket.on('connection', (ws, req) => {

    // Event for getting message from client
    ws.on('message', (msg) => {
        
        if (msg.toString() == "Apple")
        {
            Apple++;
            ws.send(`Apple votes=${(Apple / (Apple + Google) * 100).toFixed(2)}`);
        }
        if (msg.toString() == "Google")
        {
            Google++;
            ws.send(`Google votes=${(Google / (Apple + Google) * 100).toFixed(2)}`);
        }
    });

});

// Server starts for http but gets changed with 101 switching protocol
server.listen(port, () => {
    console.log(`Server running at ${port}`);
});