import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import { DiscoveryService } from "./discoveryService";

interface FileLog {
  id: string;
  fileName: string;
  peer: string;
  timestamp: number;
  type: 'sent' | 'received';
}

let fileLogs: FileLog[] = [];

function getLogsFilePath(): string {
  const logsDir = path.join(__dirname, '..', '..', 'logs');
  
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  return path.join(logsDir, 'fileLogs.json');
}

function loadLogs(): void {
  try {
    const logsPath = getLogsFilePath();
    if (fs.existsSync(logsPath)) {
      const data = fs.readFileSync(logsPath, 'utf-8');
      fileLogs = JSON.parse(data);
      console.log('Logs loaded from file:', fileLogs.length, 'entries');
    }
  } catch (error) {
    console.error('Error loading logs:', error);
    fileLogs = [];
  }
}

function saveLogs(): void {
  try {
    const logsPath = getLogsFilePath();
    fs.writeFileSync(logsPath, JSON.stringify(fileLogs, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving logs:', error);
  }
}

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
  loadLogs()
  const discovery = new DiscoveryService(9000)
  discovery.start()

  ipcMain.handle('discovery:getPeers', () => {
    console.log('peers: ', discovery.getPeers())
    return discovery.getPeers()
  })
  ipcMain.handle('discovery:discover', () => {
    discovery.discover()
  })

  ipcMain.handle('file:getLogs', () => {
    return fileLogs
  })

  ipcMain.handle('file:addLog', (event, log: Omit<FileLog, 'id'>) => {
    const newLog: FileLog = {
      ...log,
      id: Date.now().toString(),
    }
    fileLogs.push(newLog)
    saveLogs()
    console.log('File logged:', newLog)
    return newLog
  })

  createWindow()
});