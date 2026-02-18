import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { DiscoveryService } from "./discoveryService";

function createWindow() {

  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  const indexHTML = path.join(__dirname, "..", "index.html");
  win.removeMenu();
  win.loadFile(indexHTML);
}

app.whenReady().then(() => {
  const discovery = new DiscoveryService(9000)
  discovery.start()

  ipcMain.handle('discovery:getPeers', () => {
    console.log('peers: ', discovery.getPeers())
    return discovery.getPeers()
  })
  ipcMain.handle('discovery:discover', () => {
    discovery.discover()
  })
  createWindow()
});