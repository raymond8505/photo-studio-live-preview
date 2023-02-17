require("dotenv").config();
const chokidar = require("chokidar");
const sharp = require("sharp");
const path = require("path");
const watchDir = process.env.WATCH_DIR;
const fs = require("fs");

console.log(`Watching ${watchDir}`);

chokidar
  .watch(watchDir, {
    ignored: /\.nef|\.tmp|temp0/i,
    ignoreInitial: true,
    persistent: true,
  })
  .on("add", (newFile) => {
    const serverRoot = process.mainModule.path;
    const fileName = path.basename(newFile);

    console.log(" === Parsing", newFile, " ===");

    setTimeout(() => {
      sharp(newFile)
        .resize(1800)
        .toFile(`${serverRoot}/htdocs/images/lg/${fileName}`);

      sharp(newFile)
        .resize(200)
        .toFile(`${serverRoot}/htdocs/images/tn/${fileName}`);

      console.log("Parsed");

      fs.readdir(watchDir, (err, files) => {
        const jpgs = files.filter((file) => file.search(/\.jpg$/i) > -1);
        fs.writeFileSync(
          `${serverRoot}/htdocs/jpgs.json`,
          JSON.stringify(jpgs)
        );

        console.log("DB updated");
      });
    }, 5000);
  });
