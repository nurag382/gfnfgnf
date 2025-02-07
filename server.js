const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
