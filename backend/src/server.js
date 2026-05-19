import { app, PORT } from "./app.js";
import { liveMatch } from "./services/liveMatch.js"
import { WebSocketServer } from "ws";

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


const wss = new WebSocketServer({ port: 3002 }); // Set to different port to avoid conflicts

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        await liveMatch(data);
        console.log('Message sent');
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});