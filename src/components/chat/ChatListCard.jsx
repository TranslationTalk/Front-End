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
        <Dot isRead={isRead} />
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
  padding: 8px 10px 11px 10px;
  border-bottom: 1px solid var(--gray-bc);
  color: var(--gray-bc);
  position: relative;
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
  padding-bottom: 0;
  margin-bottom: 12px;
  border: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(196, 196, 196, 0.3);
  }
`

const LeftWrap = styled.div`
  padding-bottom: 5px;
  & img {
    width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 10px;
  }
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  position: absolute;
  top: 14px;
  right: 10px;
  transform: translateY(100%);
  background-color: ${props => (props.isRead ? '#BCBCBC' : '#3D51FF')};
  border-radius: 50%;
`

ChatListCard.propTypes = {
  name: PropTypes.string,
  profileUrl: PropTypes.string,
  isRead: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  auth: PropTypes.string,
}

export default ChatListCard
