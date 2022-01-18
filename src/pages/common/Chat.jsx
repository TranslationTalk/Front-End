import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatForm } from '../../components'
import { apis } from '../../utils/axios'

const Chat = () => {
  const {
    state: { roomId },
  } = useLocation()

  useEffect(() => {
    const createAndFetchChatroom = async () => {
      const data = await apis.getChatContents(roomId)
      console.log(data)
    }

    createAndFetchChatroom()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(e.target[0].value)
    await apis.sendChat(roomId, e.target[0].value)
  }

  return (
    <div>
      <ChatForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Chat
