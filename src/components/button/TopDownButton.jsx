/* 
===TopDownButton component===

*/
import React, { useState } from 'react'
import styled from 'styled-components'
import downBtn from '../../assets/images/downBtn.png'
import topBtn from '../../assets/images/topBtn.png'

const TopDownButton = () => {
  const [showTopBtn, setshowTopBtn] = useState(false)
  const [showBottomBtn, setBottomBtn] = useState(false)
  window.addEventListener('scroll', () => {
    const innerHeight = document.body.scrollHeight - window.innerHeight
    let currentScrollHeight = document.documentElement.scrollTop
    if (currentScrollHeight == 0) {
      if (showBottomBtn !== true) {
        setshowTopBtn(false)
        setBottomBtn(true)
      }
    } else if (currentScrollHeight > 0 && currentScrollHeight < innerHeight) {
      if (showBottomBtn == false && showTopBtn == false) {
        setBottomBtn(true)
        setshowTopBtn(true)
      }
    } else {
      if (showBottomBtn !== false) {
        setshowTopBtn(true)
        setBottomBtn(false)
      }
    }
  })

  return (
    <>
      <TopDownButtonWrap>
        <TopBtnImgArea showTopBtn={showTopBtn}>
          <img
            src={topBtn}
            alt="상단버튼"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
          />
        </TopBtnImgArea>

        <DownBtnImgArea showBottomBtn={showBottomBtn}>
          <img
            src={downBtn}
            alt="하단버튼"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: 'smooth',
              })
            }
          />
        </DownBtnImgArea>
      </TopDownButtonWrap>
    </>
  )
}

const TopDownButtonWrap = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  transition: all 0.5;
  z-index: 10;
`

const TopBtnImgArea = styled.div`
  transition: 0.5s;
  position: relative;
  visibility: ${props => (props.showTopBtn ? 'visible' : 'hidden')};
  opacity: ${props => (props.showTopBtn ? 1 : 0)};
  cursor: pointer;
`

const DownBtnImgArea = styled.div`
  transition: 0.5s;
  visibility: ${props => (props.showBottomBtn ? 'visible' : 'hidden')};
  opacity: ${props => (props.showBottomBtn ? 1 : 0)};

  cursor: pointer;
`

export default TopDownButton
