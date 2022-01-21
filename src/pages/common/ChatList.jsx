import React, { useEffect, useState } from 'react'
import { apis } from '../../utils/axios'
import {
  ChatListCard,
  NavigationTranslator,
  PageHeader,
} from '../../components/index'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ChatList = () => {
  const [chatList, setChatList] = useState([])
  const [auth, setAuth] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setAuth(sessionStorage.getItem('auth'))

    const fetchChatroomList = async () => {
      const { data } = await apis.getChatroomList()
      console.log(data)
      setChatList(data)
    }

    fetchChatroomList()
  }, [])

  const handleClick = id => {
    navigate(`/chat/${id}`, {
      state: { roomId: id },
    })
  }

  return (
    <Wrap>
      <PageHeader title={auth === 'translator' ? '내 상담' : '채팅'} />
      {chatList.map(chatroom => (
        <ChatListCard
          key={chatroom.id}
          name={chatroom.Request.User.username}
          isRead={
            auth === 'client'
              ? !chatroom.isReadClient
              : !chatroom.isReadTranslator
          }
          onClick={() => handleClick(chatroom.id)}
          auth={auth}
        />
      ))}
      <NavigationTranslator />
    </Wrap>
  )
}

const Wrap = styled.div`
  & > div:first-child {
    margin-bottom: 16px;
  }
`

export default ChatList
