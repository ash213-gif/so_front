# so_front


npm socket is not a single package; usually you either mean real‑time sockets with Socket.IO, low‑level WebSocket libraries, or the socket CLI wrapper around npm for security.

1. Most common: Socket.IO (real‑time)
Install server side:

bash
npm install socket.io
Basic Node + Express + Socket.IO:

js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg); // broadcast
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => console.log("Server on 3000"));
Client (e.g. in React):

bash
npm install socket.io-client
js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected", socket.id);
});

socket.emit("chat-message", "hello");
socket.on("chat-message", (msg) => console.log(msg));
Socket.IO gives event‑based, bidirectional real‑time communication over WebSocket/long‑polling.