import React, { useEffect, useState } from 'react'
import { apis } from '../../utils/axios'
import {
  ChatListCard,
  NavigationTranslator,
  NavigationUser,
  NoList,
  PageHeader,
  Spinner,
} from '../../components/index'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ChatList = () => {
  const [chatList, setChatList] = useState([])
  const auth = sessionStorage.getItem('auth')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchChatroomList = async () => {
      const { data } =
        auth === 'translator'
          ? await apis.getChatroomListTranslator()
          : await apis.getChatroomListClient()
      setChatList(data)

      setLoading(false)
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
        translatorImg: chatroom.profileUrl,
      },
    })
  }

  const getFullDate = date => {
    const year = new Date(date).getFullYear()
    const month =
      new Date(date).getMonth() < 10
        ? `0${new Date(date).getMonth()}`
        : new Date(date).getMonth()
    const day =
      new Date(date).getDate() < 10
        ? `0${new Date(date).getDate()}`
        : new Date(date).getDate()

    return `${year}.${month}.${day}`
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
              profileUrl={chatroom.profileUrl}
              field={chatroom?.Estimate?.Request.field}
              languages={[
                chatroom?.Estimate?.Request.beforeLanguage,
                chatroom?.Estimate?.Request.afterLanguage,
              ]}
              lastChatDate={getFullDate(chatroom?.lastChatDate)}
            />
          ))
        )}
      </Wrap>
      {auth === 'translator' ? <NavigationTranslator /> : <NavigationUser />}
      {loading && <Spinner loadingTitle="내 상담 가져오는 중" />}
    </>
  )
}

const Wrap = styled.div`
  padding: 72px 0;
`

export default ChatList
