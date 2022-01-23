import React, { RefObject } from 'react'
import styled from 'styled-components'

const RemoteVideo = styled.video`
  background: transparent;
  margin: 0 auto;
  display: block;
  max-width: 100vw;
  height: 100%;
`

const LocalVideo = styled.video`
  height: 130px;
  position: absolute;
  left: 24px;
  top: 24px;
  border-radius: 4px;
`

const Wrapper = styled.div`
  display: flex;
`

export const VideoView: React.FC<{
  videoHidden: boolean
  localVideoRef: RefObject<HTMLVideoElement>
  remoteVideoRef: RefObject<HTMLVideoElement>
}> = ({ videoHidden, localVideoRef, remoteVideoRef }) => {
  return (
    <>
      <Wrapper>
        <LocalVideo autoPlay muted ref={localVideoRef} />
      </Wrapper>

      <RemoteVideo
        autoPlay
        ref={remoteVideoRef}
        style={{ display: videoHidden ? 'none' : '' }}
      />
    </>
  )
}
