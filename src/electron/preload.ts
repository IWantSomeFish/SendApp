import { contextBridge, ipcRenderer } from 'electron'

console.log('Preload script loaded')

contextBridge.exposeInMainWorld('discovery', {
  getPeers: () => ipcRenderer.invoke('discovery:getPeers'),
  discover: () => ipcRenderer.invoke('discovery:discover'),
})

contextBridge.exposeInMainWorld('fileLogs', {
  getLogs: () => ipcRenderer.invoke('file:getLogs'),
  addLog: (log: any) => ipcRenderer.invoke('file:addLog', log),
})

console.log('APIs exposed to window')
