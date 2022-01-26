import propTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ChatLogo from '../../assets/images/ChatLogo.png'

const InitialChat = ({ auth, name, createdAt, isText, price }) => {
  const kDate = createdAt?.replace(/000Z$/g, '0900')
  const hours =
    new Date(kDate).getHours() < 10
      ? `0${new Date(kDate).getHours()}`
      : new Date(kDate).getHours()
  const min =
    new Date(kDate).getMinutes() < 10
      ? `0${new Date(kDate).getMinutes()}`
      : new Date(kDate).getMinutes()

  const initialChat =
    auth === 'client'
      ? {
          chat: `안녕하세요, 고객님. "${name}" 번역가님과 연결 되셨습니다. 궁금한 점을 물어보세요.`,
          createdAt,
        }
      : {
          chat: `안녕하세요, 전문가님. "${name}" 고객님이 상담 요청을 하셨습니다. 연락하셔서 안내해주세요.`,
          createdAt,
        }

  return (
    <Notice>
      <img src={ChatLogo} alt="chat-logo" />
      <Chat>
        <h3>번역톡 알림</h3>
        <p>{initialChat.chat}</p>
        <div>
          <span>번역 서비스</span>
          <span className="text">{isText ? '텍스트 번역' : '영상 번역'}</span>
        </div>
        <div>
          <span>견적가</span>
          <span className="price">{price.toLocaleString()}원</span>
        </div>
      </Chat>
      <Time>{`${hours > 12 ? '오후' : '오전'} ${
        hours > 12 ? hours - 12 : hours
      }:${min}`}</Time>
    </Notice>
  )
}

const Notice = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 0 20px;
`

const Chat = styled.div`
  width: 80%;
  max-width: 230px;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 10px;
  padding: 14px 10px;
  margin: 0 4px;
  h3 {
    font-size: var(--fs-16);
    font-weight: 500;
    color: var(--main-color);
    margin-bottom: 10px;
  }
  p {
    position: relative;
    padding-bottom: 11px;
    margin-bottom: 8px;
    word-break: keep-all;
    font-size: var(--fs-14);
    color: var(--gray);
    border-bottom: 1px solid var(--gray-c4);
  }
  div {
    display: flex;
    justify-content: space-between;
    span {
      font-size: var(--fs-16);
      color: var(--gray);
    }
    .text {
      font-weight: 500;
    }
    .price {
      font-weight: bold;
      color: var(--main-color);
    }
  }
  div:last-child {
    margin-top: 8px;
  }
`

const Time = styled.span`
  width: 35%;
  margin-top: auto;
  font-weight: 400;
  font-size: var(--fs-12);
  color: var(--dark-gray);
`

InitialChat.propTypes = {
  auth: propTypes.string,
  name: propTypes.string,
  createdAt: propTypes.string,
  isText: propTypes.bool,
  price: propTypes.number,
}

export default InitialChat
