import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const indexHTML = path.join(__dirname, "..", "index.html");
  win.loadFile(indexHTML);

}

app.whenReady().then(createWindow);

