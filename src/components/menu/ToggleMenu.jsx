/* 
===ToggleMenu component===
토글메뉴 컴포넌트는 틀이 바뀌지 않으므로 따로 설정같은 것 안해주시고 사용하셔도 됩니다.

state 이용 / 번역 견적 area 클릭시 click 변수의 값을 false로, 리뷰 area 클릭시 true로, 
click 변수값을 styled-components에 props로 전달, border-bottom 속성에 이용하였습니다.
ex) border-bottom: ${props => props.click ? '2px solid #C4C4C4' : '2px solid #FF0000'};

click과 setClick을 useState를 이용하셔서 click과 setClick을 props로 전달해주세요
const [clickNumber, setClickNumber] = useState(0)
const handleToggleMenu = number => setClickNumber(number)
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ToggleMenu = ({ menu, click, onClick }) => {
  return (
    <>
      <Wrap>
        <MenuWrap>
          {menu.map((item, index) => {
            return (
              <Menu key={index} onClick={() => onClick(index)}>
                <div>{item}</div>
                {click === index ? <UnderLineClick /> : <UnderLine />}
              </Menu>
            )
          })}
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
  justify-content: space-around;
  font-size: 20px;
`

const Menu = styled.div`
  width: 100%;
`

const UnderLineClick = styled.div`
  border-bottom: 2px solid #ff0000;
  padding-top: 15px;
`

const UnderLine = styled.div`
  border-bottom: 2px solid #c4c4c4;
  padding-top: 15px;
`

ToggleMenu.propTypes = {
  menu: PropTypes.array.isRequired,
  click: PropTypes.number,
  onClick: PropTypes.func,
}

export default ToggleMenu
