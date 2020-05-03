const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config({ path: './config/config.env' });
//Body parser
app.use(express.json());
const PORT = process.env.PORT || 5000;
const server = require('http').createServer();
const WebSocket = require('ws').Server;
const wss = new WebSocket({ server: server });
server.on('request', app);

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
  if (event === 'session') handleSessionEvent(data, ws);
  else if (event === 'sync') handleSyncEvent(data, ws);
};

const sessionById = (id) => {
  let sessionFound;

  sessions.forEach((session) => {
    if (session.sessionID === id) {
      sessionFound = session;
    }
  });

  return sessionFound;
};

const handleSyncEvent = (data, ws) => {
  sessions.forEach((session) => {
    session.users.forEach((user) => {
      if (user.ws == ws) brodcastMessage(data, session.users, ws);
    });
  });
};

const joinSession = (data, ws) => {
  let session = sessionById(data.sessionID);

  if (session) {
    session.users.push({ ws: ws });
    var totalusers = session.users.length;
    ws.send(
      JSON.stringify({
        event: 'join',
        videoID: session.videoID,
        users: totalusers,
      })
    );
    brodcastMessage(
      {
        event: 'users',
        users: totalusers,
      },
      session.users,
      ws
    );
  } else createSession(data, ws);
};

const handleSessionEvent = (data, ws) => {
  let action = data.action;
  if (action === 'create') createSession(data, ws);
  else if (action === 'join') joinSession(data, ws);
};

const createSession = (data, ws) => {
  sessions.push({
    sessionID: data.sessionID,
    users: [{ ws: ws }],
    videoID: data.videoID,
  });
};
