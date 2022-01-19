import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatBalloon, ChatForm } from '../../components'
import { apis } from '../../utils/axios'
import DefaultProfile from '../../assets/images/grayStar.png'
import io from 'socket.io-client'

export let socket

const Chat = () => {
  const {
    state: { roomId },
  } = useLocation()
  const [chatContents, setChatContents] = useState([]) // 모든 채팅 내용
  const [chatText, setChatText] = useState('') // 채팅 하나
  const [auth, setAuth] = useState('')

  useEffect(() => {
    const createAndFetchChatroom = async () => {
      const {
        data: { data },
      } = await apis.getChatContents(roomId)
      console.log(data)
      setChatContents(data)
    }

    createAndFetchChatroom()
  }, [])

  useEffect(() => {
    // storage auth 받아오기
    setAuth(sessionStorage.getItem('auth'))

    // socket init - connection
    socket = io('http://52.79.79.67:3000/chat')

    socket.on('connect', () => {
      console.log(`room${roomId} connected`)
    })

    socket.on('join', message => console.log(message))

    socket.emit('join', { message: '소켓 연결 성공' })
    socket.emit('join-room', { roomId })
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('add-chat', data => {
      console.log(data) // 렌더링 엄청 많이 됨..
      setChatContents([...chatContents, data])
    })
  }, [chatContents])

  const handleSubmit = async e => {
    e.preventDefault()
    if (e.target[0].value === '') return
    await apis.sendChat(roomId, e.target[0].value)

    setChatText('')
  }

  const handleChange = e => setChatText(e.target.value)

  return (
    <div>
      {chatContents.map(chatContent => (
        <ChatBalloon
          key={chatContent.id}
          name={chatContent?.User?.username ?? '???'}
          profileUrl={DefaultProfile}
          date={chatContent.createdAt}
          chat={chatContent.chat}
          isSelf={chatContent?.User?.auth === auth} // 내 auth와 채팅의 auth가 같을 때 채팅 오른쪽에 배치
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
