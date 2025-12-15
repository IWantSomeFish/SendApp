import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {

  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const indexHTML = path.join(__dirname, "..", "index.html");
  win.removeMenu();
  win.loadFile(indexHTML);

}

app.whenReady().then(createWindow);

