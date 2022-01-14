/**
 * ChatList에 반복적으로 나타날 Card
 * name: 상대방 이름 (string)
 * profileUrl: 상대방 profileUrl (상대방이 Client인 경우/profileUrl이 없는 경우 default profile image 사용)
 * isRead: 읽었는지 안읽었는지 boolean
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// default image이어야 함
import hamburger from '../../assets/images/hamburger.png'

const ChatListCard = ({ name, profileUrl, isRead }) => {
  return (
    <Container>
      <LeftWrap>
        <img src={profileUrl ? profileUrl : hamburger} alt="profile" />
      </LeftWrap>
      <RightWrap>
        <span>{name}님</span>
      </RightWrap>
      {/* 동그라미 icon으로 변경 필요 */}
      {isRead && <Dot></Dot>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  background-color: springgreen;
  position: relative;
`

const LeftWrap = styled.div`
  padding: 10px;
  background-color: snow;
  & img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
  }
`

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  & span {
    font-size: 18px;
    margin: 5px 0;
  }
`

const Dot = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: blue;
`

ChatListCard.propTypes = {
  name: PropTypes.string.isRequired,
  profileUrl: PropTypes.string,
  isRead: PropTypes.bool.isRequired,
}

export default ChatListCard
