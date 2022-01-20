/*
< (백 아이콘)있는 페이지에 사용하는 Header
title: 페이지 타이틀
useReloadButton: ReloadButton 사용 여부
reloadEvent: reload 클릭 시 발생할 이벤트(fetch) 함수
*/
import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { ReactComponent as ReloadIcon } from '../../assets/icons/ReloadIcon.svg'
import Logo from '../../assets/images/Logo.png'
import { HamburgerMenu } from '../index'

const PageHeader = ({ title, useReloadButton, reloadEvent }) => {
  return (
    <Container>
      <HamburgerMenu />
      {title ? <Title>{title}</Title> : <LogoImg src={Logo} alt="logo" />}
      {useReloadButton && (
        <SvgWrap>
          <ReloadIcon width="25" height="25" onClick={reloadEvent} />
        </SvgWrap>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 56px;
  padding: 16px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`

const Title = styled.h2`
  font-size: var(--fs-20);
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LogoImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const SvgWrap = styled.div`
  cursor: pointer;
`

PageHeader.propTypes = {
  title: propTypes.string,
  useReloadButton: propTypes.bool,
  reloadEvent: propTypes.func,
}

export default PageHeader
