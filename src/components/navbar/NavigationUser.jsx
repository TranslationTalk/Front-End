/*
user(번역 요청자)가 사용하는 화면의 Navigation bar
position fixed
*/
import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as TranslationIcon } from '../../assets/icons/TranslationUser.svg'
import { ReactComponent as MyDocIcon } from '../../assets/icons/MyDoc.svg'
import { ReactComponent as ChatIcon } from '../../assets/icons/Chat.svg'

const selectedAttr = {
  fill: '#3D51FF',
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
        {location === '/client/request/list' ||
        location === '/client/estimate/list' ? (
          <MyDocIcon {...selectedAttr} />
        ) : (
          <MyDocIcon />
        )}
        <NavName
          isHere={
            location === '/client/request/list' ||
            location === '/client/estimate/list'
          }
        >
          내 견적
        </NavName>
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
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  max-width: 640px;
  min-width: 360px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 5;
`

const LinkElement = styled(NavLink)`
  width: ${100 / 3}%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`

const NavName = styled.span`
  margin-top: 2px;
  color: ${props => (props.isHere ? '#3D51FF' : '#000')};
  font-size: var(--fs-12);
`

export default NavigationUser
