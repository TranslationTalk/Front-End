import React, { useEffect, useState } from 'react'
import { apis } from '../../utils/axios'
import {
  ChatListCard,
  NavigationTranslator,
  NavigationUser,
  NoList,
  PageHeader,
} from '../../components/index'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ChatList = () => {
  const [chatList, setChatList] = useState([])
  const auth = sessionStorage.getItem('auth')
  const navigate = useNavigate()

  useEffect(() => {
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
        estimateId: chatroom.estimateId,
        requestId: chatroom.requestId,
        roomId: chatroom.id,
        anothername:
          auth === 'client'
            ? chatroom.translatorName
            : chatroom.Estimate.Request.User.username,
        createdTime: chatroom.createdAt,
      },
    })
  }

  return (
    <>
      <PageHeader title={auth === 'translator' ? '내 상담' : '채팅'} />
      <Wrap>
        {chatList.length === 0 ? (
          <NoList listName='아직 "진행 중인 상담"이 없어요' />
        ) : (
          chatList.map(chatroom => (
            <ChatListCard
              key={chatroom.id}
              name={
                auth === 'client'
                  ? chatroom.translatorName
                  : chatroom.Estimate.Request.User.username
              }
              isRead={
                auth === 'client'
                  ? !chatroom.isReadClient
                  : !chatroom.isReadTranslator
              }
              onClick={() => handleClick(chatroom)}
              auth={auth}
            />
          ))
        )}
      </Wrap>
      {auth === 'translator' ? <NavigationTranslator /> : <NavigationUser />}
    </>
  )
}

const Wrap = styled.div`
  padding: 72px 0;
`

export default ChatList
