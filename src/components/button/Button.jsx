/* 
===Button Component===
긴 버튼은 longBtn, 짧은 버튼은 shortBtn  
background-color는 bgColor로, color는 color로 props내려주시면 됩니다.

외의 일반 버튼 사용시, 커스터마이징을 원하시면 props로 내려주시면 됩니다.
*/

import styled from 'styled-components'
import React from 'react'

const Button = prop => {
  const {
    content,
    _onClick,
    height,
    width,
    margin,
    padding,
    color,
    bgColor,
    border,
    longBtn,
    shortBtn,
    type,
  } = prop

  const styles = {
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    color: color,
    bgColor: bgColor,
    border: border,
  }

  if (longBtn) {
    return (
      <>
        <LongButton {...styles} onClick={_onClick}>
          {content}
        </LongButton>
      </>
    )
  }

  if (shortBtn) {
    return (
      <>
        <ShortButton {...styles} onClick={_onClick}>
          {content}
        </ShortButton>
      </>
    )
  }

  return (
    <>
      <CustomButton {...styles} onClick={_onClick} type={type}>
        {content}
      </CustomButton>
    </>
  )
}

Button.defaultProps = {
  bgColor: `#3D51FF`,
  color: `#000`,
  width: '100px',
  height: '20px',
  type: 'button',
  margin: 'auto',
}

const CustomButton = styled.button`
  ${props => (props.width ? `width: ${props.width};` : '')}
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.bgColor ? `background-color: ${props.bgColor};` : '')}
  ${props => (props.color ? `color: ${props.color};` : '')}
  ${props => (props.margin ? `margin: ${props.margin};` : '')}
  ${props => (props.padding ? `padding: ${props.padding};` : '')}
  ${props => (props.border ? `border: ${props.border};` : '')}
  box-sizing: border-box;
  border-radius: 5px;
`

const LongButton = styled.button`
  width: 320px;
  height: 44px;
  margin: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: ${props => (props.border ? `${props.border}` : 'none')};
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  cursor: pointer;
`

const ShortButton = styled.button`
  width: 160px;
  height: 44px;
  margin: 10px;
  font-size: 16px;
  outline: none;
  border-radius: 4px;
  border: ${props => (props.border ? `${props.border}` : 'none')};
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  cursor: pointer;
`

export default Button
