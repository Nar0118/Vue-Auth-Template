import { Server, Socket } from "socket.io";
import http from "http";

export function initializeSocketIO(server: http.Server): void {
  const io = new Server(server);

  // Listen for the "connection" event when a client connects
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    // Initialize a set to store room names
    const rooms = new Set<string>();

    // Listen for the "join room" event from the client
    socket.on("join room", (roomName: string, cb) => {
      // Join the specified room
      socket.join(roomName);
      rooms.add(roomName); // Add the room name to the set
      cb(`User joined room: ${roomName}`);
    });

    // Listen for the "send message" event from the client
    socket.on("send message", (roomName: string, msg: string) => {
      console.log(`Received message in room ${roomName}: ${msg}`);

      // Check if the room exists (is in the set of rooms)
      if (rooms.has(roomName)) {
        // If the room exists, emit the message to that room using socket.to(roomName)
        socket.to(roomName).emit("receive message", msg);
      } else {
        // If the room doesn't exist, broadcast the message to everyone
        socket.broadcast.emit("receive message", msg);
      }
    });

    // Listen for the "disconnect" event when a client disconnects
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}
