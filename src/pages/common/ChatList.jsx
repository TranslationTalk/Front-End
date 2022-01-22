import React, { useEffect, useState } from 'react'
import { apis } from '../../utils/axios'
import {
  ChatListCard,
  NavigationTranslator,
  NavigationUser,
  PageHeader,
} from '../../components/index'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ChatList = () => {
  const [chatList, setChatList] = useState([])
  const [auth, setAuth] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = sessionStorage.getItem('auth')
    setAuth(auth)

    const fetchChatroomList = async () => {
      const { data } =
        auth === 'translator'
          ? await apis.getChatroomListTranslator()
          : await apis.getChatroomListClient()
      console.log(data)
      setChatList(data)
    }

    fetchChatroomList()
  }, [])

  const handleClick = chatroom => {
    navigate(`/chat/${chatroom.id}`, {
      state: {
        roomId: chatroom.id,
        anothername:
          auth === 'translator'
            ? chatroom.Request.User.username
            : chatroom.translatorName,
      },
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
          onClick={() => handleClick(chatroom)}
          auth={auth}
        />
      ))}
      {auth === 'translator' ? <NavigationTranslator /> : <NavigationUser />}
    </Wrap>
  )
}

const Wrap = styled.div`
  & > div:first-child {
    margin-bottom: 16px;
  }
`

export default ChatList
