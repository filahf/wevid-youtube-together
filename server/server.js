const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
dotenv.config({ path: './config/config.env' });
//Body parser
app.use(express.json());
const PORT = process.env.PORT || 5000;
const server = require('http').createServer();
const WebSocket = require('ws').Server;
const wss = new WebSocket({ server: server });
server.on('request', app);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});

let sessions = [];

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(JSON.parse(message));
    handleMessage(JSON.parse(message), ws);
  });
});

const brodcastMessage = (data, users, ws) => {
  users.forEach((user) => {
    if (user.ws != ws) user.ws.send(JSON.stringify(data));
  });
};

const handleMessage = (data, ws) => {
  let event = data.event;
  if (event === 'room') handleRoomEvent(data, ws);
  else if (event === 'sync') handleSyncEvent(data, ws);
};

const findRoomWithId = (id) => {
  let roomFound;

  sessions.forEach((room) => {
    if (room.roomId === id) roomFound = room;
  });

  return roomFound;
};

const handleSyncEvent = (data, ws) => {
  sessions.forEach((room) => {
    room.users.forEach((user) => {
      if (user.ws == ws) brodcastMessage(data, room.users, ws);
    });
  });
};

const joinRoom = (data, ws) => {
  let room = findRoomWithId(data.roomId);

  if (room) {
    room.users.push({ username: data.username, ws: ws, haveControl: false });
    notifyUsers(data, ws, room.users);
  } else createRoom(data, ws);
};

const handleRoomEvent = (data, ws) => {
  let action = data.action;
  if (action === 'create') createRoom(data, ws);
  else if (action === 'join') joinRoom(data, ws);
  else if (action === 'leave') leaveRoom(data, ws);
};

const leaveRoom = (data, ws) => {
  let users;

  //Remove user from it's room and sends notification to others
  sessions.forEach((room) => {
    room.users.forEach((user, index, object) => {
      if (user.ws == ws) {
        users = room.users;
        object.splice(index, 1);
      } else
        brodcastMessage(
          {
            event: 'online',
            action: 'left',
            username: data.username,
          },
          room.users,
          ws
        );
    });
  });
};

const createRoom = (data, ws) => {
  sessions.push({
    roomId: data.roomId,
    users: [{ username: data.username, ws: ws, haveControl: true }],
  });
  ws.send(
    JSON.stringify({
      event: 'control',
      action: 'youhavecontrol',
      youHaveControl: true,
    })
  );
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit
  server.close(() => process.exit(1));
});
