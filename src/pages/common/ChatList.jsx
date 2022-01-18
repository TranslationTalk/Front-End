import React from 'react'
import { apis } from '../../utils/axios'
import { ChatListCard, PageHeader } from '../../components/index'

const ChatList = () => {
  React.useEffect(() => {
    apis
      .chatList()
      .then(res => console.log(res))
      .catch(e => console.log(e))
  })
  return (
    <>
      <PageHeader />
      <ChatListCard name="야옹이" />
      <ChatListCard name="야옹이" />
      <ChatListCard name="야옹이" />
      <ChatListCard name="야옹이" />
    </>
  )
}

export default ChatList
