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
import { HamburgerMenu } from '../index'

const PageHeader = ({ title, useReloadButton, reloadEvent }) => {
  return (
    <Container>
      <HamburgerMenu />
      <Title>{title}</Title>
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
  height: 50px;
  padding: 0 15px;
  background-color: violet;
  position: relative;
`

const Title = styled.h2`
  font-size: 1.3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const SvgWrap = styled.div`
  cursor: pointer;
`

PageHeader.propTypes = {
  title: propTypes.string.isRequired,
  useReloadButton: propTypes.bool,
  reloadEvent: propTypes.func,
}

export default PageHeader
