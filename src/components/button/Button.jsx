import styled from 'styled-components'
import React from 'react'

// longBtn, shortBtn
function Button(props) {
  const prop = props

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
      <CustomButton {...styles} onClick={_onClick}>
        {content}
      </CustomButton>
    </>
  )
}

Button.defaultProps = {
  bgc: `#3D51FF`,
  color: `#FFFFFF`,
}

const CustomButton = styled.button`
  ${props => (props.width ? `width: ${props.width}` : '')};
  ${props => (props.height ? `height: ${props.height}` : '')};
  ${props => (props.bgColor ? `background-color: ${props.bgColor}` : '')};
  ${props => (props.color ? `color: ${props.color}` : '')};
  ${props => (props.margin ? `margin: ${props.margin};` : '')}
  ${props => (props.padding ? `padding: ${props.padding}` : '')};
  ${props => (props.border ? `border: ${props.border}` : '')};
  box-sizing: border-box;
  border-radius: 5px;
`

const LongButton = styled.button`
  width: 320px;
  height: 44px;
  margin: 10px;
  font-size: 16px;
  border: 1px solid #999;
  border-radius: 4px;
  background-color: ${props => props.bgc};
  color: ${props => props.color};
  cursor: pointer;
`

const ShortButton = styled.button`
  width: 160px;
  height: 44px;
  margin: 10px;
  font-size: 16px;
  border: 1px solid #999;
  border-radius: 4px;
  background-color: ${props => props.bgc};
  color: ${props => props.color};
  cursor: pointer;
`

export default Button
