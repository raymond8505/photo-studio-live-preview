require("dotenv").config();
const chokidar = require("chokidar");
const sharp = require("sharp");
const path = require("path");
const watchDir = process.env.WATCH_DIR;

chokidar
  .watch(watchDir, {
    ignored: /\.nef|\.tmp|temp0/i,
    ignoreInitial: true,
    persistent: true,
  })
  .on("add", (newFile) => {
    const serverRoot = process.mainModule.path;
    const fileName = path.basename(newFile);

    sharp(newFile)
      .resize(2000)
      .toFile(`${serverRoot}/htdocs/images/lg/${fileName}`);

    sharp(newFile)
      .resize(200)
      .toFile(`${serverRoot}/htdocs/images/tn/${fileName}`);
  });
