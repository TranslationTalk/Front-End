import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatBalloon, ChatForm } from '../../components'
import { apis } from '../../utils/axios'

const Chat = () => {
  const {
    state: { roomId },
  } = useLocation()
  const [chatContents, setChatContents] = useState([]) // 모든 채팅 내용
  const [chatText, setChatText] = useState('') // 채팅 하나

  useEffect(() => {
    const createAndFetchChatroom = async () => {
      const {
        data: { data },
      } = await apis.getChatContents(roomId)
      console.log(data)
      setChatContents(data)
      // chat 컨텐츠 받아올 때 userId만 담아져 있는데,
      // 여기서 나의 userId를 알 수가 없다
      // 그래서 translator 인지, client인지 알려주는 데이터를 보내주면
      // 그거를 토대로 왼쪽에 보여줄 것, 오른쪽에 보여줄 것을 나타낼 수 있다.
    }

    createAndFetchChatroom()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (e.target[0].value === '') return
    console.log(e.target[0].value)
    await apis.sendChat(roomId, e.target[0].value)
    setChatText('')
  }

  const handleChange = e => setChatText(e.target.value)

  return (
    <div>
      {chatContents.map(chatContent => (
        <ChatBalloon
          key={chatContent.id}
          name="temp"
          profileUrl="a.png"
          date={chatContent.createdAt}
          chat={chatContent.chat}
          isSelf={false}
        />
      ))}
      <ChatForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={chatText}
      />
    </div>
  )
}

export default Chat
