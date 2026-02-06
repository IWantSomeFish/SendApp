import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('discovery', {
  getPeers: () => ipcRenderer.invoke('discovery:getPeers'),
  discover: () => ipcRenderer.invoke('discovery:discover'),
})
