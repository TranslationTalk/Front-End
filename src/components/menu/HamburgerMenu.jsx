/* 
===HamburgerMenu component===
햄버거메뉴 컴포넌트는 틀이 바뀌지 않으므로 따로 설정같은 것 안해주시고 사용하셔도 되지만, 부모컴포넌트의 포지션 설정을 해주셔야합니다.  

state 이용 / 햄버거 모양 클릭시 click 변수의 값을 false로, 닫기버튼 클릭시 true로, 
click 변수값을 styled-components에 props로 전달, 왼쪽에서 밀려나오는 애니메이션을 구현해주었습니다.
ex) visibility: ${props => (props.click ? 'visible' : 'hidden')};
ex) transform: ${props => (props.click ? 'translateX(105%)' : 'translateX(0)')};
*/

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Hamburger from '../../assets/icons/HamburgerIcon.svg'
import { ReactComponent as Close } from '../../assets/icons/Close.svg'
import LogOutIcon from '../../assets/icons/LogOutIcon.svg'

const HamburgerMenu = () => {
  const [click, setClick] = React.useState(false)
  const navigate = useNavigate()
  return (
    <>
      <HamburgerTap onClick={() => setClick(true)} click={click}>
        <img src={Hamburger} alt="hamburger" />
      </HamburgerTap>

      <ModalArea click={click}>
        <ModalInner click={click}>
          <Top>
            <div>
              <i onClick={() => setClick(false)}>
                <Close fill="#fff" width="22px" height="22px" />
              </i>
            </div>
            <p
              onClick={() => {
                sessionStorage.clear()
                navigate('/')
              }}
            >
              로그아웃
            </p>
          </Top>
          <Buttom>
            <ul>
              <li>
                <a href="https://cafe.naver.com/etranscafe">카페 이동하기</a>
              </li>
              <li>
                <Link to={''}>약관</Link>
              </li>
              <li>
                <Link to={''}>개인정보취급방침</Link>
              </li>
            </ul>
          </Buttom>
        </ModalInner>
      </ModalArea>
    </>
  )
}

const HamburgerTap = styled.div`
  cursor: pointer;
`

const ModalArea = styled.div`
  box-sizing: border-box;
  visibility: ${props => (props.click ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: 0.5s;
  overflow: hidden;
  background-color: ${props => (props.click ? 'rgba(0, 0, 0, 0.5)' : '')};
  z-index: 11;
`

const ModalInner = styled.div`
  width: 247px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  transition: 0.5s;
  visibility: ${props => (props.click ? 'visible' : 'hidden')};
  transform: ${props =>
    props.click ? 'translateX(0px)' : 'translateX(-247px)'};
  z-index: 11;
`

const Top = styled.div`
  width: 247px;
  height: 143px;
  background-color: var(--main-color);
  div {
    display: flex;
    padding: 6px 5px;
    justify-content: end;
  }
  i {
    display: block;
    width: 34px;
    height: 34px;
    padding: 5px;
    margin: 5px;
    background-size: 24px 24px;
    background-position: 50%;
    background-repeat: no-repeat;
    content: '';
    cursor: pointer;
  }
  p {
    display: block;
    margin: 10px auto 0;
    width: 52px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    &::before {
      display: block;
      width: 34px;
      height: 34px;
      padding-bottom: 3px;
      margin: auto;
      background-image: url(${LogOutIcon});
      background-size: 32px;
      background-repeat: no-repeat;
      content: '';
    }
  }
`
const Buttom = styled.div`
  ul {
    margin: 0px;
  }
  li a {
    display: block;
    font-size: 14px;
    font-weight: 500;
    padding: 14px 0 14px 20px;
    transition: all 0.5s;
    &:hover {
      background-color: var(--light-blue);
    }
  }
`

export default HamburgerMenu
