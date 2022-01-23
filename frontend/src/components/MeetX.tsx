import { ControlBar } from './ControllBar'
import { InviteInfo } from './InviteInfo'
import { SignalData } from 'simple-peer'
import { Socket, io } from 'socket.io-client'
import { VideoView } from './VideoView'
import { getVideoStream } from '../utils'
import { useHistory } from 'react-router-dom'
import React, { RefObject, createRef } from 'react'
import VideoCall from '../helpers/simple-peer'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`

type MeetXPlayerState = {
  isCalling: boolean
  localStream: MediaStream
  localStreamUrl: string
  remoteStreamUrl: string
  streamPeer: object
  isConnecting: boolean
  isWaiting: boolean
  isMicEnabled: boolean
  isCamEnabled: boolean
  socket: Socket
}

type MeetXPlayerProps = {
  match: { params: { roomId: string } }
}

class MeetX extends React.Component<MeetXPlayerProps, MeetXPlayerState> {
  videoCall = new VideoCall()
  localVideoRef: RefObject<HTMLVideoElement> = createRef()
  remoteVideoRef: RefObject<HTMLVideoElement> = createRef()

  constructor(props: MeetXPlayerProps) {
    super(props)

    this.state = {
      isCalling: false,
      isCamEnabled: false,
      isConnecting: false,
      isMicEnabled: false,
      isWaiting: true,
      localStream: undefined,
      localStreamUrl: '',
      remoteStreamUrl: '',
      socket: undefined,
      streamPeer: undefined,
    }
  }

  async componentDidMount() {
    const socket = io({ path: '/api/socket.io' })
    this.setState({ socket })
    const { roomId } = this.props.match.params
    this.setupSocketBehaviour(socket, roomId)

    const stream = await getVideoStream()
    this.setState({ localStream: stream })
    this.localVideoRef.current.srcObject = stream
    this.localVideoRef.current.muted = true
    socket.emit('join', { roomId })
  }

  setupSocketBehaviour(socket, roomId) {
    socket.on('init', () => {
      this.setState({ isCalling: true })
    })
    socket.on('ready', () => {
      this.initStream(roomId)
    })
    socket.on('signal', (data: SignalData) => {
      if (data.type === 'offer' && this.state.isCalling) return
      if (data.type === 'answer' && !this.state.isCalling) return
      this.videoCall.connect(data)
    })
    socket.on('disconnected', () => {
      this.setState({ isWaiting: true })
    })
    socket.on('kick', () => {
      location.href = '/'
    })
  }

  toggleAudioLocal() {
    if (this.state.localStream.getAudioTracks().length > 0) {
      this.state.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
    }
    this.setState({
      isMicEnabled: !this.state.isMicEnabled,
    })
  }

  toggleVideoLocal() {
    if (this.state.localStream.getVideoTracks().length > 0) {
      this.state.localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
    }
    this.setState({
      isCamEnabled: !this.state.isCamEnabled,
    })
  }

  initStream(roomId) {
    this.setState({ isConnecting: true })
    const streamPeer = this.videoCall.init(
      this.state.localStream,
      this.state.isCalling
    )
    this.setState({ streamPeer })

    streamPeer.on('signal', (signal) => {
      this.state.socket.emit('signal', { roomId, signal })
    })
    streamPeer.on('stream', (stream) => {
      this.remoteVideoRef.current.srcObject = stream
      this.setState({ isConnecting: false, isWaiting: false })
    })
    streamPeer.on('error', function (err) {
      console.log(err)
    })
  }

  kickUser() {
    this.setState({ isWaiting: true })
    const { roomId } = this.props.match.params
    this.state.socket.emit('kick', { roomId: roomId })
    this.remoteVideoRef.current.srcObject = undefined
  }

  render() {
    return (
      <Wrapper>
        <VideoView
          localVideoRef={this.localVideoRef}
          remoteVideoRef={this.remoteVideoRef}
          videoHidden={this.state.isWaiting}
        />

        {this.state.isWaiting && <InviteInfo />}

        <ControlBar
          micEnabled={this.state.isMicEnabled}
          camEnabled={this.state.isCamEnabled}
          kickAvailable={this.state.isCalling && !this.state.isWaiting}
          onMicClickCallback={() => this.toggleAudioLocal()}
          onCamClickCallback={() => this.toggleVideoLocal()}
          onKickClickedCallback={() => this.kickUser()}
        />
      </Wrapper>
    )
  }
}

export default MeetX
