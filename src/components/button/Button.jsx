import styled from 'styled-components'
import React from 'react'
import downBtn from '../../assets/images/downBtn.png'
import topBtn from '../../assets/images/topBtn.png'

// longBtn, shortBtn
function Button(props) {
  React.useEffect(() => {
    setTimeout(window.addEventListener('scroll', getScrollY), 1000)

    return () => window.removeEventListener('scroll', getScrollY)
  }, [])
  const [topLocation, setTopLocation] = React.useState(0)
  // const [innerHeight, setInnerHeight] = React.useState(0)
  const innerHeight = window.innerHeight
  const getScrollY = () => {
    setTopLocation(window.scrollY)
  }

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
    topDownBtn,
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

  if (topDownBtn) {
    return (
      <>
        <TopDownButton>
          <TopBtnImgArea
            topLocation={topLocation}
            innerHeight={innerHeight}
            scrollHeight={document.body.scrollHeight}
          >
            <img
              src={topBtn}
              alt="상단버튼"
              onClick={() => window.scrollTo(0, 0)}
            />
          </TopBtnImgArea>

          <DownBtnImgArea
            topLocation={topLocation}
            innerHeight={innerHeight}
            scrollHeight={document.body.scrollHeight}
          >
            <img
              src={downBtn}
              alt="하단버튼"
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            />
          </DownBtnImgArea>
        </TopDownButton>
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
  bgColor: `#3D51FF`,
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
  background-color: ${props => props.bgColor};
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
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  cursor: pointer;
`

const TopDownButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`

const TopBtnImgArea = styled.div`
  transition: 0.5s;
  position: relative;
  ${props => (props.topLocation < 200 ? `opacity:0;` : `opacity:1`)};
  ${props =>
    props.topLocation + props.innerHeight > props.scrollHeight - 200
      ? `transform: translateY(42px)`
      : ''}
`

const DownBtnImgArea = styled.div`
  transition: 0.5s;
  opacity: ${props =>
    props.topLocation + props.innerHeight < props.scrollHeight - 200 ? 1 : 0};
`

export default Button
