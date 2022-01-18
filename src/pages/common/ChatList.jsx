import React from 'react'
import {
  ChatListCard,
  NavigationTranslator,
  PageHeader,
} from '../../components'

const ChatList = () => {
  return (
    <div>
      <PageHeader title="채팅방 리스트" />
      <ChatListCard name="개발자" profileUrl="a.png" isRead />
      <ChatListCard name="개발자" profileUrl="a.png" isRead={false} />
      <ChatListCard name="개발자" profileUrl="a.png" isRead />
      <ChatListCard name="개발자" profileUrl="a.png" isRead={false} />
      <NavigationTranslator />
    </div>
  )
}

export default ChatList
