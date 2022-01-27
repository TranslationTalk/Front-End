/**
 * ChatList에 반복적으로 나타날 Card
 * name: 상대방 이름 (string)
 * profileUrl: 상대방 profileUrl (상대방이 Client인 경우/profileUrl이 없는 경우 default profile image 사용)
 * isRead: 읽었는지 안읽었는지 boolean
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ReactComponent as ReadDot } from '../../assets/icons/ReadDot.svg'
import { ReactComponent as NotReadDot } from '../../assets/icons/NotReadDot.svg'
// default image이어야 함
import defaultThumb from '../../assets/images/ListThumb.png'

const ChatListCard = ({ name, profileUrl, isRead, onClick, auth }) => {
  return (
    <Container onClick={onClick}>
      <LeftWrap>
        <img src={profileUrl ? profileUrl : defaultThumb} alt="profile" />
      </LeftWrap>
      <RightWrap>
        <span>
          <span>{name}</span>
          {auth === 'translator' ? '유저' : '번역가'}님
        </span>
        {/* 가져올 데이터가 없음 */}
        <p>2022.01.22</p>
        <Dot>{isRead ? <ReadDot /> : <NotReadDot />}</Dot>
      </RightWrap>
    </Container>
  )
}

const RightWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 10px 11px 10px;
  border-bottom: 1px solid var(--gray-bc);
  color: var(--gray-bc);
  position: relative;
  transition: all 0.3s ease-in-out;
  cursor: default;
  & > span {
    font-size: var(--fs-14);
  }

  & > span > span {
    font-size: var(--fs-16);
    font-weight: 500;
    margin-right: 4px;
    color: #000;
  }
  & > p {
    margin-top: 4px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--white);
  position: relative;
  width: 100%;
  padding: 10px 20px;
  border: none;

  &:hover ${RightWrap} {
    border-bottom: 1px solid var(--main-color);
  }
`

const LeftWrap = styled.div`
  & img {
    margin-right: 10px;
  }
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  position: absolute;
  top: 0;
  right: 8px;
  transform: translateY(100%);
`

ChatListCard.propTypes = {
  name: PropTypes.string,
  profileUrl: PropTypes.string,
  isRead: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  auth: PropTypes.string,
}

export default ChatListCard
