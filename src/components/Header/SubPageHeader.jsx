import React from 'react'
import propTypes from 'prop-types'
import { Button } from '../index'
import styled from 'styled-components'
import { ReactComponent as ArrowbackIcon } from '../../assets/icons/ArrowbackIcon.svg'

const SubPageHeader = ({ title, useButton, buttonEvent }) => {
  return (
    <Container>
      <SvgWrap>
        <ArrowbackIcon width="20" height="20" onClick={() => history.back()} />
      </SvgWrap>
      <Title>{title}</Title>
      {useButton && <Button content="작업 완료" _onClick={buttonEvent} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
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

SubPageHeader.propTypes = {
  title: propTypes.string.isRequired,
  useButton: propTypes.bool,
  buttonEvent: propTypes.func,
}

export default SubPageHeader
