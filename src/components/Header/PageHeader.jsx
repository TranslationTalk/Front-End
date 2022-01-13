import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { ReactComponent as HamburgerIcon } from '../../assets/icons/HamburgerIcon.svg'
import { ReactComponent as ReloadIcon } from '../../assets/icons/ReloadIcon.svg'

const PageHeader = ({ title, useReloadButton, reloadEvent }) => {
  return (
    <Container>
      {/* 형래님 작업하신 Menu에서 HamburgerMenu로 사용하면 됨 */}
      <HamburgerIcon width="25" height="25" />
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
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: violet;
  padding: 0 15px;
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
