const { Server } = require("socket.io");

let io;

const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      // no-op
    });
  });

  return io;
};

const getIO = () => io;

module.exports = initializeSocket;
module.exports.getIO = getIO;
