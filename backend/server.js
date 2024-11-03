const http = require("http");
const app = require("./app");
require("dotenv").config();
const { setupWebSocket } = require("./utils/websocket");

const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1); // Exit with an error code
});
