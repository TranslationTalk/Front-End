/*
user(번역 요청자)가 사용하는 화면의 Navigation bar
position fixed
*/
import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as ChatIcon } from '../../assets/icons/chat.svg'

// 스타일 많이 달라질 것으로 예상
// icon 변경해야하고, active시 스타일 어떻게 할지 아직 모름
const selectedAttr = {
  width: '30',
  height: '30',
  fill: 'black',
}

const NavigationUser = () => {
  const location = useLocation().pathname

  return (
    <NavContainer>
      <LinkElement to="/">
        {location === '/' ? (
          <ChatIcon width="20" height="20" {...selectedAttr} />
        ) : (
          <ChatIcon width="20" height="20" />
        )}
        <NavName isHere={location === '/'}>번역 요청</NavName>
      </LinkElement>
      <LinkElement to="/list">
        {location === '/list' ? (
          <ChatIcon width="20" height="20" {...selectedAttr} />
        ) : (
          <ChatIcon width="20" height="20" />
        )}
        <NavName isHere={location === '/list'}>내 견적</NavName>
      </LinkElement>
      <LinkElement to="/chat">
        {location === '/chat' ? (
          <ChatIcon width="20" height="20" {...selectedAttr} />
        ) : (
          <ChatIcon width="20" height="20" />
        )}
        <NavName isHere={location === '/chat'}>내 상담</NavName>
      </LinkElement>
    </NavContainer>
  )
}

const NavContainer = styled.div`
  width: 100%;
  height: 5.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
`

const LinkElement = styled(NavLink)`
  width: ${100 / 3}%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 1.8rem;
`

const NavName = styled.span`
  color: ${props => (props.isHere ? 'blue' : 'black')};
  font-size: 1rem;
`

export default NavigationUser
