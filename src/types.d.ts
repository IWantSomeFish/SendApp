declare global {
  interface Window {
    discovery: {
      getPeers: () => Promise<any[]>;
      discover: () => Promise<void>;
    };
    fileLogs: {
      getLogs: () => Promise<any[]>;
      addLog: (log: any) => Promise<any>;
    };
  }
}

export interface Peer {
  id: string;
  ip: string;
  port: number;
  hostname: string;
  lastSeen: number;
}

export {};