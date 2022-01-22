import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ChatBalloon,
  ChatDate,
  ChatForm,
  SubPageHeader,
} from '../../components'
import { apis } from '../../utils/axios'
import DefaultProfile from '../../assets/images/grayStar.png'
import io from 'socket.io-client'
import styled from 'styled-components'

const Chat = () => {
  const {
    state: { roomId, anothername }, // 클라이언트에서 상담하기 눌렀을 때 처음 방을 생성했다는 것을 알려주어야 함
  } = useLocation()
  const [chatContents, setChatContents] = useState([]) // 모든 채팅 내용
  const [chatSections, setChatSections] = useState([]) // 날짜별로 묶은 채팅
  const [chatText, setChatText] = useState('') // 채팅 하나
  const [auth, setAuth] = useState('')

  useEffect(() => {
    // storage auth 받아오기
    setAuth(sessionStorage.getItem('auth'))

    const createAndFetchChatroom = async () => {
      const {
        data: { data },
      } = await apis.getChatContents(roomId)
      console.log(data)

      // 여기서 initial Chat을 받아오면 좋을 것 같다.
      const initialChat = {
        User: { auth: 'translator', anothername }, // 번역가 이름 받아오기 (auth는 translator로 고정)
        chat: `안녕하세요. 고객님 "\${translator's name}" 번역가님과 연결 되셨습니다. 궁금한 점을 물어보세요`, // chat 내용 받아오기
        id: -1, // id는 default이니까 그냥 겹칠 일 없는 -1로 둠
        createdAt: new Date().toISOString(), // 생성할 때의 시간 가져오기
        updatedAt: new Date().toISOString(),
      }
      setChatContents([initialChat, ...data])
      makeSectionByDate(data)
    }

    createAndFetchChatroom()
  }, [])

  useEffect(() => {
    // socket init - connection
    const socket = io('http://52.79.79.67:3000/chat')

    socket.on('connect', () => {
      console.log(`room${roomId} connected`)
    })

    socket.on('join', message => console.log(message))

    socket.emit('join', { message: '소켓 연결 성공' })
    socket.emit('join-room', { roomId })

    socket.on('add-chat', data => {
      console.log(data)
      setChatContents(prev => [...prev, data])
    })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (e.target[0].value === '') return
    await apis.sendChat(roomId, e.target[0].value)

    setChatText('')
  }

  const handleChange = e => setChatText(e.target.value)

  const handleFinishWork = async () => {
    await apis.finishEstimate(roomId)
  }

  const makeSectionByDate = chatList => {
    const sections = {}
    chatList.forEach(chat => {
      const monthDate = chat.createdAt.split('T')[0]
      if (sections[monthDate]?.length) {
        // sections[monthDate]가 이미 있는 경우에는 저기에 chat을 push해주고 없으면 값 부여
        sections[monthDate] = [...sections[monthDate], chat]
      } else {
        sections[monthDate] = [chat]
      }
    })
    setChatSections(sections)
  }

  useEffect(() => {
    makeSectionByDate(chatContents)
  }, [chatContents])

  return (
    <>
      <SubPageHeader
        leftTitle={anothername ?? chatContents[1]?.User.username}
        useButton
        buttonEvent={handleFinishWork}
      />
      <ChatWrap>
        {Object.entries(chatSections).map(([date, chatData]) => (
          <div key={date}>
            <ChatDate date={date} />
            {chatData.map(chatContent => (
              <ChatBalloon // 처음 요소는 번역톡 알림 컴포넌트 추가해서 넣어주어야 할 듯
                key={chatContent.id}
                name={anothername}
                profileUrl={DefaultProfile}
                date={chatContent.createdAt}
                chat={chatContent.chat}
                isSelf={chatContent?.User?.auth === auth} // 내 auth와 채팅의 auth가 같을 때 채팅 오른쪽에 배치
                auth={auth}
              />
            ))}
          </div>
        ))}
      </ChatWrap>
      <ChatForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={chatText}
      />
    </>
  )
}

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 0 16px;
  gap: 8px;
`

export default Chat
