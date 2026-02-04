import dgram from 'dgram'
import os from 'os'
import { randomUUID } from 'crypto'

/* ================== CONFIG ================== */

const MULTICAST_ADDR = '239.255.42.99'
const DISCOVERY_PORT = 41234

const APP_MAGIC = 'MY_DESKTOP_APP'
const PROTOCOL_VERSION = 1

const ANNOUNCE_INTERVAL = 5000     // ms
const PEER_TIMEOUT = 15000         // ms

/* ================== TYPES ================== */

type DiscoveryMessage =
  | {
      type: 'DISCOVER'
      magic: string
      version: number
      senderId: string
    }
  | {
      type: 'ANNOUNCE' | 'RESPONSE'
      magic: string
      version: number
      senderId: string
      tcpPort: number
      hostname: string
    }

export type Peer = {
  id: string
  ip: string
  port: number
  hostname: string
  lastSeen: number
}

/* ================== SERVICE ================== */

export class DiscoveryService {
  private socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })
  private instanceId = randomUUID()
  private peers = new Map<string, Peer>()
  private announceTimer?: NodeJS.Timeout
  private cleanupTimer?: NodeJS.Timeout

  constructor(private tcpPort: number) {}

  /* ---------- PUBLIC API ---------- */

  start() {
    this.bindSocket()
    this.startAnnounce()
    this.startCleanup()
    this.discover()
  }

  stop() {
    this.announceTimer && clearInterval(this.announceTimer)
    this.cleanupTimer && clearInterval(this.cleanupTimer)
    this.socket.close()
    this.peers.clear()
  }

  getPeers(): Peer[] {
    return [...this.peers.values()]
  }

  discover() {
    const msg: DiscoveryMessage = {
      type: 'DISCOVER',
      magic: APP_MAGIC,
      version: PROTOCOL_VERSION,
      senderId: this.instanceId,
    }

    this.send(msg)
  }

  /* ---------- INTERNAL ---------- */

  private bindSocket() {
    this.socket.on('message', (msg, rinfo) =>
      this.handleMessage(msg, rinfo)
    )

    this.socket.bind(DISCOVERY_PORT, () => {
      this.socket.addMembership(MULTICAST_ADDR)
      this.socket.setMulticastTTL(1)
    })
  }

  private handleMessage(msg: Buffer, rinfo: dgram.RemoteInfo) {
    let data: DiscoveryMessage
    try {
      data = JSON.parse(msg.toString())
    } catch {
      return
    }

    // фильтр "чужих"
    if (
      data.magic !== APP_MAGIC ||
      data.version !== PROTOCOL_VERSION
    ) return

    // фильтр самого себя
    if (data.senderId === this.instanceId) return

    switch (data.type) {
      case 'DISCOVER':
        this.sendResponse(rinfo.address, rinfo.port)
        break

      case 'ANNOUNCE':
      case 'RESPONSE':
        this.registerPeer(data, rinfo.address)
        break
    }
  }

  private sendResponse(ip: string, port: number) {
    const msg: DiscoveryMessage = {
      type: 'RESPONSE',
      magic: APP_MAGIC,
      version: PROTOCOL_VERSION,
      senderId: this.instanceId,
      tcpPort: this.tcpPort,
      hostname: os.hostname(),
    }

    this.socket.send(
      Buffer.from(JSON.stringify(msg)),
      port,
      ip
    )
  }

  private startAnnounce() {
    this.announceTimer = setInterval(() => {
      const msg: DiscoveryMessage = {
        type: 'ANNOUNCE',
        magic: APP_MAGIC,
        version: PROTOCOL_VERSION,
        senderId: this.instanceId,
        tcpPort: this.tcpPort,
        hostname: os.hostname(),
      }

      this.send(msg)
    }, ANNOUNCE_INTERVAL)
  }

  private startCleanup() {
    this.cleanupTimer = setInterval(() => {
      const now = Date.now()
      for (const [id, peer] of this.peers) {
        if (now - peer.lastSeen > PEER_TIMEOUT) {
          this.peers.delete(id)
        }
      }
    }, 5000)
  }

  private registerPeer(
    data: Extract<DiscoveryMessage, { tcpPort: number }>,
    ip: string
  ) {
    this.peers.set(data.senderId, {
      id: data.senderId,
      ip,
      port: data.tcpPort,
      hostname: data.hostname,
      lastSeen: Date.now(),
    })
  }

  private send(msg: DiscoveryMessage) {
    this.socket.send(
      Buffer.from(JSON.stringify(msg)),
      DISCOVERY_PORT,
      MULTICAST_ADDR
    )
  }
}
