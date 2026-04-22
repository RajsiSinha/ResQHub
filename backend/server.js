const http = require("http");
const dotenv = require("dotenv");

const app = require("./app");
const connectDatabase = require("./config/db");
const initializeSocket = require("./utils/socket");

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("MongoDB connected");

    const server = http.createServer(app);
    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
