import React from 'react'
import styled from 'styled-components'
import Hamburger from '../../assets/images/hamburger.png'

const Menu = props => {
  const prop = props

  const { toggleMenu, hamburgerMenu } = prop

  const [click, setClick] = React.useState(false)

  if (toggleMenu) {
    return (
      <>
        <Wrap>
          <MenuWrap>
            <Request onClick={() => setClick(false)} click={click}>
              번역 견적
            </Request>
            <Review onClick={() => setClick(true)} click={click}>
              번역가님 리뷰<TotalReviews>999</TotalReviews>
            </Review>
          </MenuWrap>
        </Wrap>
      </>
    )
  }
  if (hamburgerMenu) {
    return (
      <>
        <BurgerWrap>
          <HamburgerTap onClick={() => setClick(true)} click={click}>
            <img src={Hamburger} alt="hamburger" />
          </HamburgerTap>

          <ModalArea click={click} tabIndex="-1">
            <ModalInner click={click} tabIndex="0">
              12345asdfjkasdkfsakdfgkasgdkfgaskdhgfhjasgdjfg
              <CloseModal onClick={() => setClick(false)}> XXX</CloseModal>
            </ModalInner>
          </ModalArea>
        </BurgerWrap>
      </>
    )
  }
}

const Wrap = styled.div`
  width: 100%;
`

const MenuWrap = styled.div`
  margin: auto;
  display: flex;
  text-align: center;
  align-items: center;
  cursor: pointer;
`

const Request = styled.div`
  width: 50%;
  border-bottom: ${props =>
    props.click ? '2px solid #C4C4C4' : '2px solid #FF0000'};
  padding: 10px;
`

const Review = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: ${props =>
    props.click ? '2px solid #FF0000' : '2px solid #C4C4C4'};
  position: relative;
`

const TotalReviews = styled.div`
  background-color: #fcbbbb;
  color: #111010;
  border-radius: 100%;
  padding: 4px 8px 1px;
  position: absolute;
  right: 10px;
`

// 햄버거
const BurgerWrap = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
`

const HamburgerTap = styled.div`
  display: ${props => (props.click ? 'none' : 'block')};
  cursor: pointer;
`

const ModalArea = styled.div`
  box-sizing: border-box;
  visibility: ${props => (props.click ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: 0.5s;
  background-color: ${props => (props.click ? 'rgba(0, 0, 0, 0.5)' : '')};
  z-index: 99;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: fixed;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  left: -25%;
  transition: 0.5s;
  transform: ${props => (props.click ? 'translateX(105%)' : 'translateX(0)')};
  margin: 0 auto;
`

const CloseModal = styled.div`
  cursor: pointer;
`

export default Menu
