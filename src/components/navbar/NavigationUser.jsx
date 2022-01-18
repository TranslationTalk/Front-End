/*
user(번역 요청자)가 사용하는 화면의 Navigation bar
position fixed
*/
import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as TranslationIcon } from '../../assets/icons/Translation.svg'
import { ReactComponent as MyDocIcon } from '../../assets/icons/MyDoc.svg'
import { ReactComponent as ChatIcon } from '../../assets/icons/Chat.svg'

const selectedAttr = {
  fill: 'black',
}

const NavigationUser = () => {
  const location = useLocation().pathname

  return (
    <NavContainer>
      <LinkElement to="/client/main">
        {location === '/client/main' ? (
          <TranslationIcon {...selectedAttr} />
        ) : (
          <TranslationIcon />
        )}
        <NavName isHere={location === '/client/main'}>번역 요청</NavName>
      </LinkElement>
      <LinkElement to="/client/request/list">
        {location === '/client/request/list' ? (
          <MyDocIcon {...selectedAttr} />
        ) : (
          <MyDocIcon />
        )}
        <NavName isHere={location === '/client/request/list'}>내 견적</NavName>
      </LinkElement>
      <LinkElement to="/chat/list">
        {location === '/chat/list' ? (
          <ChatIcon {...selectedAttr} />
        ) : (
          <ChatIcon />
        )}
        <NavName isHere={location === '/chat/list'}>내 상담</NavName>
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
