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

const SubPageHeader = ({ title, leftTitle, useButton, buttonEvent, auth }) => {
  return (
    <Container>
      <SvgWrap>
        <ArrowbackIcon onClick={() => history.back()} />
      </SvgWrap>
      {leftTitle && (
        <LeftTitle>
          {leftTitle}{' '}
          <span>{leftTitle && auth === 'translator' ? '번역가' : ''}님</span>
        </LeftTitle>
      )}
      <Title>{title}</Title>
      {/* border radius 추가 필요 */}
      {useButton && (
        <Button
          content="작업 완료"
          _onClick={buttonEvent}
          margin="0"
          width="fit-content"
          height="30px"
          padding="5px 10px"
          color="#fff"
          bgColor="#FF5F5F"
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
  height: 56px;
  padding: 16px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`

const LeftTitle = styled.h2`
  font-size: var(--fs-20);
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  line-height: 56px;
  & span {
    font-size: var(--fs-14);
    font-weight: normal;
  }
`

const Title = styled.h2`
  font-size: var(--fs-20);
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const SvgWrap = styled.div`
  cursor: pointer;
`

SubPageHeader.propTypes = {
  title: propTypes.string,
  useButton: propTypes.bool,
  buttonEvent: propTypes.func,
  leftTitle: propTypes.string,
  auth: propTypes.string,
}

export default SubPageHeader
