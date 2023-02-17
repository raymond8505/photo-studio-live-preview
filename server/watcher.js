require("dotenv").config();
const chokidar = require("chokidar");

const watchDir = process.env.WATCH_DIR;

chokidar
  .watch(watchDir, {
    ignored: /\.nef|\.tmp|temp0/i,
    ignoreInitial: true,
    persistent: true,
  })
  .on("add", (path) => {
    console.log(path);
  });
