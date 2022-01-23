import Peer, { SignalData } from 'simple-peer'

export default class VideoCall {
  peer: Peer.Instance | null = null

  init(stream: MediaStream, isCalling: boolean): Peer.Instance {
    this.peer = new Peer({
      initiator: isCalling,
      stream: stream,
      trickle: false,
      config: { iceServers: [{ urls: ['stun:stun4.l.google.com:19302'] }] },
    })
    return this.peer
  }

  connect(otherId: string | SignalData) {
    this.peer.signal(otherId)
  }
}
