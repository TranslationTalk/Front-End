/* 
===TopDownButton component===

*/
import React from 'react'
import styled from 'styled-components'
import downBtn from '../../assets/images/downBtn.png'
import topBtn from '../../assets/images/topBtn.png'

const TopDownButton = () => {
  React.useEffect(() => {
    setTimeout(window.addEventListener('scroll', getScrollY), 1000)

    return () => window.removeEventListener('scroll', getScrollY)
  }, [])

  const [topLocation, setTopLocation] = React.useState(0)
  const innerHeight = window.innerHeight
  const getScrollY = () => {
    setTopLocation(window.scrollY)
  }

  return (
    <>
      <TopDownButtonWrap>
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
      </TopDownButtonWrap>
    </>
  )
}

const TopDownButtonWrap = styled.div`
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

export default TopDownButton
