/*
translator(번역가)가 사용하는 화면의 Navigation bar
position fixed
*/
import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as ChatIcon } from '../../assets/icons/Chat.svg'
import { ReactComponent as MyListIcon } from '../../assets/icons/List.svg'
import { ReactComponent as TranslationIcon } from '../../assets/icons/Translation.svg'
import { ReactComponent as PersonIcon } from '../../assets/icons/Person.svg'

// 스타일 많이 달라질 것으로 예상
// icon 변경해야하고, active시 스타일 어떻게 할지 아직 모름
const selectedAttr = {
  fill: '#3D51FF',
}

const NavigationTranslator = () => {
  const location = useLocation().pathname

  return (
    <NavContainer>
      <LinkElement to="/translator/list">
        {location === '/translator/list' ? (
          <MyListIcon {...selectedAttr} />
        ) : (
          <MyListIcon />
        )}
        <NavName isHere={location === '/translator/list'}>번역 리스트</NavName>
      </LinkElement>
      <LinkElement to="/translator/translation/list">
        {location === '/translator/translation/list' ? (
          <TranslationIcon {...selectedAttr} />
        ) : (
          <TranslationIcon />
        )}
        <NavName isHere={location === '/translator/translation/list'}>
          내 번역
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
      <LinkElement to="/translator/mypage">
        {location === '/translator/mypage' ? (
          <PersonIcon {...selectedAttr} />
        ) : (
          <PersonIcon />
        )}
        <NavName isHere={location === '/translator/mypage'}>마이페이지</NavName>
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
  z-index: 5; // z-index 수정 -> header와 같게 함
`

const LinkElement = styled(NavLink)`
  width: ${100 / 4}%;
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

export default NavigationTranslator
