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
import { useLocation } from 'react-router-dom'
import { ReactComponent as ArrowbackIcon } from '../../assets/icons/ArrowbackIcon.svg'

const SubPageHeader = ({
  title,
  leftTitle,
  useButton,
  buttonEvent,
  call,
  buttonLabel,
}) => {
  const location = useLocation().pathname

  return (
    <Container shouldWrap={location !== '/'} useButton={useButton}>
      <ArrowbackIcon onClick={() => history.back()} />
      {leftTitle ? (
        <LeftTitle>
          {leftTitle}
          <span>{call}님</span>
        </LeftTitle>
      ) : (
        <Title>{title}</Title>
      )}
      <Button content={buttonLabel} onClick={buttonEvent} bgColor="#FF5F5F" />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  position: fixed;
  top: 0;
  left: ${props => (props.shouldWrap ? '50%' : '0')};
  ${props => (props.shouldWrap ? 'transform: translateX(-50%);' : null)}
  ${props => (props.shouldWrap ? 'max-width: 640px;' : null)}
  min-width: 360px;
  z-index: 5;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  & > svg {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: translateX(-5px);
    }
  }

  & > button {
    font-size: var(--fs-12);
    font-weight: normal;
    width: fit-content;
    height: fit-content;
    padding: 5px 10px;
    border-radius: 15px;
    visibility: ${props => (props.useButton ? 'visible' : 'hidden')};
  }
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
    margin-left: 4px;
  }
`

const Title = styled.h2`
  font-size: var(--fs-20);
  font-weight: bold;
`

SubPageHeader.propTypes = {
  title: propTypes.string,
  useButton: propTypes.bool,
  buttonEvent: propTypes.func,
  leftTitle: propTypes.string,
  call: propTypes.string,
  buttonLabel: propTypes.string,
}

export default SubPageHeader
