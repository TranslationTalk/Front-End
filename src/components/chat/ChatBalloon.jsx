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

const ChatBalloon = prop => {
  const { name, profileUrl, chat, date, isSelf } = prop

  // 문자를 보낸 시간과 분
  const hours = new Date(date).getHours()
  const min = new Date(date).getMinutes()

  return (
    <Chat isSelf={isSelf}>
      {isSelf ? null : (
        <div className="profile">
          <img src={profileUrl} alt={name} />
        </div>
      )}
      <div className="massage">
        {isSelf ? null : <p className="name">{name}</p>}

        <p className="chat">{chat}</p>
      </div>
      <span className="time">{`${hours}:${min}`}</span>
    </Chat>
  )
}

// 말풍선 꼬리(삼각형)
const rightTriangle = `&:after {
  position: absolute;
  right: -10px;
  top: 10px;
  border-top: 10px solid #f9f871;
  border-left: 10px solid #f9f871;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  content: '';
}`
const leftTriangle = `&:before {
  position: absolute;
  left: -10px;
  top: 30px;
  border-top: 10px solid #f9f871;
  border-left: 10px solid transparent;
  border-right: 10px solid #f9f871;
  border-bottom: 10px solid transparent;
  content: '';`

const Chat = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: ${prop => (prop.isSelf ? 'row-reverse' : 'row')};
  & .profile {
    display: flex;
    flex-direction: column;
    & img {
      width: 50px;
      height: 50px;
      margin: 0 10px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  & .massage {
    position: relative;
    margin: 0 10px;
    max-width: 50%;
    word-break: break-all;
    ${prop => (prop.isSelf ? rightTriangle : leftTriangle)}
    }
    & .chat {
      display: inline-black;
      margin-top: 5px;
      padding: 10px;
      background: #f9f871;
      border-radius: 10px;
    }
    & .name {
      margin:0 5px;
      ${prop => (prop.isSelf ? 'text-align: right' : 'text-align: left')}
    }
  }
  & .time {
    margin-top: auto;
  }
`

ChatBalloon.propTypes = {
  name: PropTypes.string,
  profileUrl: PropTypes.string,
  chat: PropTypes.string,
  time: PropTypes.string,
}

export default ChatBalloon
