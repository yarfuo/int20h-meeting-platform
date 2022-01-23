// @ts-ignore
import { ReactComponent as MicOnIcon } from '../icons/micOn.svg'
// @ts-ignore
import { ReactComponent as MicOffIcon } from '../icons/micOff.svg'
// @ts-ignore
import { ReactComponent as CamOnIcon } from '../icons/camOn.svg'
// @ts-ignore
import { ReactComponent as CamOffIcon } from '../icons/camOff.svg'
// @ts-ignore
import { ReactComponent as KickIcon } from '../icons/kick.svg'

import React from 'react'
import styled from 'styled-components'

const ControlBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  background: rgb(24, 26, 27);
  display: flex;
  column-gap: 10px;
  justify-content: center;
`

const ControlButton = styled.button<{ dark: boolean }>`
  position: relative;
  outline: none;
  border: none;
  background-color: ${(props) =>
    props.dark ? 'rgb(111, 0, 0)' : 'rgb(48, 52, 54)'};
  height: 64px;
  width: 64px;
  cursor: pointer;
  color: #fff;
`

export const ControlBar: React.FC<{
  micEnabled: boolean
  camEnabled: boolean
  kickAvailable: boolean
  onMicClickCallback: () => void
  onCamClickCallback: () => void
  onKickClickedCallback: () => void
}> = ({
  micEnabled,
  camEnabled,
  kickAvailable,
  onMicClickCallback,
  onCamClickCallback,
  onKickClickedCallback,
}) => {
  return (
    <ControlBarContainer>
      <ControlButton onClick={onMicClickCallback} dark={micEnabled}>
        {micEnabled ? <MicOffIcon /> : <MicOnIcon />}
      </ControlButton>

      <ControlButton onClick={onCamClickCallback} dark={camEnabled}>
        {camEnabled ? <CamOffIcon /> : <CamOnIcon />}
      </ControlButton>

      {kickAvailable && (
        <ControlButton onClick={onKickClickedCallback} dark={true}>
          <KickIcon />
        </ControlButton>
      )}
    </ControlBarContainer>
  )
}
