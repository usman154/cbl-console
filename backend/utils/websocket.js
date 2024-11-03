const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;
const clients = new Map();

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("connection");
    ws.on("message", (message) => {
      const msgString = message.toString();

      jwt.verify(msgString, SECRET_KEY, (err, decoded) => {
        if (err) {
          ws.send('token:invalid');
          console.error("Token verification failed:", err);
          ws.close(1008, "Token verification failed");
          
          return; // Exit the handler
        }

        const { userId } = decoded;
        clients.set(userId, ws);
      });
    });

    ws.on("close", () => {
      for (const [userId, clientWs] of clients.entries()) {
        if (clientWs === ws) clients.delete(userId);
      }
    });
  });
}

function notifyAllClients(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

module.exports = { setupWebSocket, notifyAllClients };
