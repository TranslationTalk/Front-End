/* 
===HamburgerMenu component===
햄버거메뉴 컴포넌트는 틀이 바뀌지 않으므로 따로 설정같은 것 안해주시고 사용하셔도 되지만, 부모컴포넌트의 포지션 설정을 해주셔야합니다.  

state 이용 / 햄버거 모양 클릭시 click 변수의 값을 false로, 닫기버튼 클릭시 true로, 
click 변수값을 styled-components에 props로 전달, 왼쪽에서 밀려나오는 애니메이션을 구현해주었습니다.
ex) visibility: ${props => (props.click ? 'visible' : 'hidden')};
ex) transform: ${props => (props.click ? 'translateX(105%)' : 'translateX(0)')};
*/

import React from 'react'
import styled from 'styled-components'
import Hamburger from '../../assets/images/hamburger.png'

const HamburgerMenu = () => {
  const [click, setClick] = React.useState(false)

  return (
    <>
      <BurgerWrap>
        <HamburgerTap onClick={() => setClick(true)} click={click}>
          <img src={Hamburger} alt="hamburger" />
        </HamburgerTap>

        <ModalArea click={click} tabIndex="-1"></ModalArea>
        <ModalInner click={click} tabIndex="0">
          12345asdfjkasdkfsakdfgkafg
          <CloseModal onClick={() => setClick(false)}> XXX</CloseModal>
        </ModalInner>
      </BurgerWrap>
    </>
  )
}

const BurgerWrap = styled.div`
  position: absolute;
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
  width: 250px;
  position: absolute;
  top: 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  left: -270px;
  transition: 0.5s;
  visibility: ${props => (props.click ? 'visible' : 'hidden')};
  transform: ${props =>
    props.click ? 'translateX(260px)' : 'translateX(1px)'};
  z-index: 100;
`

const CloseModal = styled.div`
  cursor: pointer;
`

export default HamburgerMenu
