//const { onMessage, onConnection, init } = require("./app/index");
const WebSocket = require("ws");
const port = 1596;

let server = new WebSocket.Server({
  port,
});

function startServer({ onMessage, onConnection, init }) {
  init(server).then(() => {
    console.log(`Starting Web Socket server at port ${port}`);
    server.on("connection", (sender) => {
      onConnection(sender, server);

      sender.on("message", (msg) => {
        onMessage(msg, sender, server);
      });
    });
  });
}

module.exports = {
  startServer,
};
