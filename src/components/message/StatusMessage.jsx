/*
  상태 메시지
  text: 메시지 // string
  icon: "info" or "alarm" // string
  color: 메시지의 색 // string
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import infoImg from '../../assets/images/info.svg'
import alarmerrorImg from '../../assets/images/alarmerror.svg'

const StatusMessage = ({ text, color, icon }) => {
  let iconImg = infoImg
  switch (icon) {
    case 'info':
      iconImg = infoImg
      break
    case 'alarm':
      iconImg = alarmerrorImg
      break
    default:
      console.log(
        icon + 'StatusMessage 컴포넌트 icon props를 잘못 입력하셨습니다.',
      )
  }

  return (
    <StatusMsg color={color} icon={iconImg}>
      <i />
      <span>{text}</span>
    </StatusMsg>
  )
}

const StatusMsg = styled.div`
  color: ${props => props.color};
  font-size: var(--fs-12);
  & i {
    color: #fff;
    display: inline-block;
    width: var(--fs-18);
    height: var(--fs-18);
    border-radius: 50%;
    margin-right: 4px;
    margin-bottom: -5px;
    background: url(${props => props.icon});
    background-size: cover;
    text-align: center;
    font-weight: bold;
  }
`

StatusMessage.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  info: PropTypes.bool,
  alarm: PropTypes.bool,
}

export default StatusMessage
