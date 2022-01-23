import React from 'react'
import styled from 'styled-components'

const InviteInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  height: 100vh;
`

const InviteLink = styled.code`
  padding: 8px 15px;
  background: #ffffff;
  color: #000;
  border-radius: 3px;
`

export const InviteInfo = () => {
  return (
    <InviteInfoContainer>
      <h2>Invite link:</h2>
      <InviteLink>{window.location.href}</InviteLink>
    </InviteInfoContainer>
  )
}
