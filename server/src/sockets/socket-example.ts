import { io, Socket } from "socket.io-client";
import env from "../util/constants/env";

const socket: Socket = io(`http://localhost:${env.port}`);

function joinRoom(roomName: string): void {
  socket.emit("join room", roomName, (message: string) => {
    console.log(message);
  });
}

function sendMessage(roomName: string, message: string): void {
  socket.emit("send message", roomName, message);
}

socket.on("receive message", (msg: string) => {
  console.log(`Received message: ${msg}`);
  // Handle the received message
});

// Example usage:
// Join a room named "room1"
joinRoom("room1");

// Send a message within the "room1" room
sendMessage("room1", "Hello, room!");
