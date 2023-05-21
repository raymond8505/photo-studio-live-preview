const { WebSocket } = require("ws");
const { startServer } = require("../socket-manager");

/**
 * Handles all messages coming from the client. This is your entry point to your server's actual
 * functionality
 * @param msg:Buffer the message data sent from the client
 * @param sender:WebSocket
 * @param server:WebSocketServer
 */
function onMessage(msg, sender, server) {
  sender.send("Server Connected");
  console.log("message received", msg.toString());
}

/**
 * When the client makes a connection. Use this to initialize stuff for
 * the server app
 * @param socket:WebSocket
 * @param server:WebSocketServer
 */
function onConnection(socket, server) {
  broadcast("new connection");
}

let wsServer;

/**
 * Called before the first connection
 * @param server:WebSocketServer
 * @returns a Promise that, when resolved, adds the connection and message listeners
 */
function init(server) {
  wsServer = server;
  return new Promise((resolve, reject) => {
    resolve(null);
  });
}

/**
 * Sends the given data to every connection
 * @param {any} msg
 */
function broadcast(msg) {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
}

startServer({
  onMessage,
  onConnection,
  init,
});
