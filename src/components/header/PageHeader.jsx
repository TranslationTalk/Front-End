/*
< (백 아이콘)있는 페이지에 사용하는 Header
title: 페이지 타이틀
useReloadButton: ReloadButton 사용 여부
reloadEvent: reload 클릭 시 발생할 이벤트(fetch) 함수
*/
import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { ReactComponent as ReloadIcon } from '../../assets/icons/ReloadIcon.svg'
import { ReactComponent as SettingIcon } from '../../assets/icons/Settings.svg'
import { ReactComponent as Logo } from '../../assets/icons/Logo.svg'
import { HamburgerMenu } from '../index'

const PageHeader = ({
  title,
  useReloadButton,
  reloadEvent,
  useSettingButton,
  settingEvent,
}) => {
  const location = useLocation().pathname

  return (
    <Container shouldWrap={location !== '/'}>
      {location === '/' || <HamburgerMenu />}
      {title ? <Title>{title}</Title> : <Logo />}
      <SvgWrap>
        {useReloadButton ? (
          <ReloadIcon onClick={reloadEvent} />
        ) : useSettingButton ? (
          <SettingIcon onClick={settingEvent} />
        ) : null}
      </SvgWrap>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 16px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: ${props => (props.shouldWrap ? '50%' : '0')};
  ${props => (props.shouldWrap ? 'transform: translateX(-50%);' : null)}
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 5;
  ${props => (props.shouldWrap ? 'max-width: 640px;' : null)}
  min-width: 360px;

  // title이 없을 때 logo는 absolute로 처리
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (min-width: 640px) {
    height: ${props => (props.shouldWrap ? '56px' : '80px')};
  }
`

const Title = styled.h2`
  font-size: var(--fs-20);
  font-weight: bold;
`

const SvgWrap = styled.div`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: rotate(0);
  &:hover {
    transform: rotate(60deg);
  }
`

PageHeader.propTypes = {
  title: propTypes.string,
  useReloadButton: propTypes.bool,
  reloadEvent: propTypes.func,
  useSettingButton: propTypes.bool,
  settingEvent: propTypes.func,
}

export default PageHeader
