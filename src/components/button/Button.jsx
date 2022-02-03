/* 
===Button Component===
긴 버튼은 longBtn, 짧은 버튼은 shortBtn  
background-color는 bgColor로, color는 color로 props내려주시면 됩니다.

외의 일반 버튼 사용시, 커스터마이징을 원하시면 props로 내려주시면 됩니다.
*/

import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

const Button = prop => {
  const { onClick, content, color, bgColor, border, type } = prop

  return (
    <Btn
      className={border ? 'hover' : null}
      onClick={onClick}
      color={color ?? '#fff'}
      bgColor={bgColor ?? '#3D51FF'}
      border={border}
      type={type}
    >
      {content}
    </Btn>
  )
}

const Btn = styled.button`
  color: ${prop => (prop.border ? '#3D51FF' : prop.color)};
  background-color: ${prop => (prop.border ? '#fff' : prop.bgColor)};
  padding: 10px 0;
  font-weight: bold;
  border: 1px solid ${prop => prop.bgColor};
  border-radius: 4px;
  font-size: var(--fs-18);
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.5s;
  &.hover:hover {
    background-color: ${prop => (prop.border ? '#3D51FF' : prop.color)};
    color: ${prop => (prop.border ? '#fff' : prop.bgColor)};
  }
`
Button.prototype = {
  onClick: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  border: PropTypes.bool,
  type: PropTypes.string,
}

export default Button
