/// <reference types="node" />

type FirewallFunction = (remotePublicKey: Buffer) => boolean;

export interface HyperswarmOptions {
  keyPair?: any; // A Noise keypair that will be used to listen/connect on the DHT. Defaults to a new key pair.
  seed?: any; // A unique, 32-byte, random seed that can be used to deterministically generate the key pair.
  maxPeers?: number; // The maximum number of peer connections to allow.
  firewall?: FirewallFunction; // A sync function of the form remotePublicKey => (true|false). If true, the connection will be rejected. Defaults to allowing all connections.
  dht?: any; // A DHT instance. Defaults to a new instance.
}

export interface PeerInfo {
  // Define PeerInfo properties and methods
  ban(banStatus?: boolean): void;
}

export interface PeerDiscovery {
  flushed(): Promise<void>;
  refresh(config: { client: boolean, server: boolean }): Promise<void>;
  destroy(): Promise<void>;
}

export class Hyperswarm {
  constructor(options?: HyperswarmOptions);
  join(topic: Buffer, options?: any): PeerDiscovery;
  leave(topic: Buffer): void;
  joinPeer(noisePublicKey: Buffer): void;
  leavePeer(noisePublicKey: Buffer): void;
  status(topic: Buffer): PeerDiscovery;
  listen(): void;
  flush(): Promise<void>;

  on(event: 'connection', listener: (socket: any, peerInfo: PeerInfo) => void): this;
  on(event: 'update', listener: () => void): this;
}
