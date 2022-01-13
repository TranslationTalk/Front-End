/* 
===ToggleMenu component===
토글메뉴 컴포넌트는 틀이 바뀌지 않으므로 따로 설정같은 것 안해주시고 사용하셔도 됩니다.

state 이용 / 번역 견적 area 클릭시 click 변수의 값을 false로, 리뷰 area 클릭시 true로, 
click 변수값을 styled-components에 props로 전달, border-bottom 속성에 이용하였습니다.
ex) border-bottom: ${props => props.click ? '2px solid #C4C4C4' : '2px solid #FF0000'};
*/

import React from 'react'
import styled from 'styled-components'

const ToggleMenu = () => {
  const [click, setClick] = React.useState(false)

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

export default ToggleMenu
