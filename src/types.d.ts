declare global {
  interface Window {
    discovery: {
      getPeers: () => Promise<any[]>;
      discover: () => Promise<void>;
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