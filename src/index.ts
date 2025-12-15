import { app, BrowserWindow } from "electron";
import * as path from "path";

app.on("ready", () => {
  console.log("App is ready");

  const win = new BrowserWindow({
    width: 400,
    height: 600,
  });

  const indexHTML = path.join(__dirname + "/index.html");
  win.removeMenu();
  win
    .loadFile(indexHTML)
    .then(() => {
      // IMPLEMENT FANCY STUFF HERE
    })
    .catch((e) => console.error(e));
});
