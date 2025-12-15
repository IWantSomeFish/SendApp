import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();

}

app.whenReady().then(createWindow);

