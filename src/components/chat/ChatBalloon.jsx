/*
  채팅 말풍선
  name: 유저 이름 //string
  profileUrl: 상대방 프로필 url //string
  chat: 채팅 내용 //string
  date: 채팅 입력 날짜 "2022-01-15T04:33:14.0900" //string
  isSelf: true면 작성자방향말풍선(오른쪽), false면 상대쪽방향말풍선(왼쪽) //bool
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import basicProfile from '../../assets/images/TranslatorProfile.png'

const ChatBalloon = prop => {
  const { name, profileUrl, chat, date, isSelf } = prop

  // 문자를 보낸 시간과 분
  const kDate = date?.replace(/000Z$/g, '0900')
  const hours =
    new Date(kDate).getHours() < 10
      ? `0${new Date(kDate).getHours()}`
      : new Date(kDate).getHours()
  const min =
    new Date(kDate).getMinutes() < 10
      ? `0${new Date(kDate).getMinutes()}`
      : new Date(kDate).getMinutes()

  return (
    <Chat isSelf={isSelf}>
      {isSelf ? null : (
        <div className="profile">
          <img src={profileUrl ?? basicProfile} alt={name} />
        </div>
      )}
      <div className="massage">
        <p className="chat">{chat}</p>
      </div>
      <Time>{`${hours > 12 ? '오후' : '오전'} ${
        hours > 12 ? hours - 12 : hours
      }:${min}`}</Time>
    </Chat>
  )
}

// 말풍선 꼬리(삼각형)
const rightTriangle = `&:after {
  position: absolute;
  right: -10px;
  top: 10px;
  border-top: 10px solid #fff;
  border-left: 10px solid #fff;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  content: '';
}`
const leftTriangle = `&:before {
  position: absolute;
  left: -10px;
  top: 10px;
  border-top: 10px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid #fff;
  border-bottom: 10px solid transparent;
  content: '';`

const Chat = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px 20px 10px 10px;
  flex-direction: ${prop => (prop.isSelf ? 'row-reverse' : 'row')};
  & .profile {
    display: flex;
    flex-direction: column;
    & img {
      width: var(--fs-32);
      height: var(--fs-32);
      margin: 0 10px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  & .massage {
    position: relative;
    margin: 0 5px;
    word-break: break-all;
    ${prop => (prop.isSelf ? rightTriangle : leftTriangle)}
    font-size: var(--fs-14);
  }
  & .chat {
    margin-top: 5px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
  }
`
const Time = styled.span`
  margin-top: auto;
  font-weight: 400;
  font-size: var(--fs-12);
  color: var(--dark-gray);
`
ChatBalloon.propTypes = {
  name: PropTypes.string,
  profileUrl: PropTypes.string,
  chat: PropTypes.string,
  date: PropTypes.string,
  isSelf: PropTypes.bool,
}

export default ChatBalloon
