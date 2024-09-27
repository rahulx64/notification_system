const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const notificationRoutes = require("./routes/notifications");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json()); // Parse incoming requests as JSON

// Serve notifications API routes
app.use("/api/notifications", notificationRoutes);

// Real-time WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Broadcast notification to all users
const broadcastNotification = (notification) => {
  io.emit("broadcast", notification); // Emit to all connected clients
};

app.set("broadcastNotification", broadcastNotification);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
