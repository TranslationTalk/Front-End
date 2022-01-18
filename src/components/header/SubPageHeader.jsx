/*
< (백 아이콘)있는 페이지에 사용하는 Header
title: 페이지 타이틀
useButton: Button 사용 여부
buttonEvent: Button 클릭 시 발생할 이벤트 함수
*/
import React from 'react'
import propTypes from 'prop-types'
import { Button } from '../index'
import styled from 'styled-components'
import { ReactComponent as ArrowbackIcon } from '../../assets/icons/ArrowbackIcon.svg'

const SubPageHeader = ({ title, useButton, buttonEvent }) => {
  return (
    <Container>
      <SvgWrap>
        <ArrowbackIcon onClick={() => history.back()} />
      </SvgWrap>
      <Title>{title}</Title>
      {useButton && (
        <Button
          content="작업 완료"
          _onClick={buttonEvent}
          margin="0"
          width="fit-content"
          height="fit-content"
          padding="0.25rem 0.5rem"
          color="blue"
          bgColor="pink"
          border="none"
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
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
