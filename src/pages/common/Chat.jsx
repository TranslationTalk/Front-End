import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ChatBalloon,
  ChatDate,
  ChatForm,
  SubPageHeader,
} from '../../components'
import { apis, clientAPIs } from '../../utils/axios'
import DefaultProfile from '../../assets/images/grayStar.png'
import io from 'socket.io-client'
import styled from 'styled-components'

const Chat = () => {
  const {
    state: { roomId, anothername, createdTime },
  } = useLocation()
  const [chatContents, setChatContents] = useState([]) // 모든 채팅 내용
  const [chatSections, setChatSections] = useState([]) // 날짜별로 묶은 채팅
  const [chatText, setChatText] = useState('') // 채팅 하나
  const auth = sessionStorage.getItem('auth')
  // const [name, setName] = useState('translator')

  useEffect(() => {
    const createAndFetchChatroom = async () => {
      const {
        data: { data },
      } = await apis.getChatContents(roomId)
      console.log(data)

      setChatContents(data)
      makeSectionByDate(data)
    }

    console.log(anothername) // 상대방 이름
    console.log(createdTime) // 채팅방 생성 시간

    // auth가 번역가라면 어디에서 받아오는 것이 아니라 여기서 서버로 번역가 정보 달라고 요청해야한다.
    // 왜냐하면 여기 전 단계 (TranslationEstimateDetail, ChatList) 둘 다 번역가 이름에 대한 정보가 없다.
    // 그렇다고 해서 각각의 페이지에서 번역가 정보를 서버에 요청하고 넘겨 받는 것은 비효율적이다.
    // 또한, 번역가라면 title에 이름 달 때 user name 이 필요한데, chatList에는 username이 있지만,
    // TranslationEstimateDetail 페이지에는 user name이 없다.

    // auth가 client라면 TranslatorDetail 페이지에서 상담하기 눌러서 넘어올 때,
    // ChatList에서 방 하나를 눌러서 넘어올 때 이다.
    // 이 때 client쪽에서 confirmedTranslator 정보를 받아와야 한다.
    // ChatList에서는 translatorname을 가져올 수 있다.
    // 그런데 TranslatorDetail에서는 어떤 것을 가져올 수 있을 지 모른다.

    // 이름 가져오기.
    // 지금은 여기서 fetching을 하지만, 이게 아니라 클라이언트에서 받아오거나
    // 처음 로그인했을 때 정보를 저장해두었다가 가져와야 한다.
    // const getMyInfo = async () => {
    //   const {
    //     data: { data },
    //   } = await apis.getTranslatorMypage()
    //   console.log(data)
    //   setName(data.name)
    // }
    // if (auth === 'translator') {
    //   // translator 일 때만 info를 가져올 수 있으므로
    //   getMyInfo()
    // }

    createAndFetchChatroom()
  }, [])

  // initial chat 설정
  // useEffect(() => {
  //   console.log(name)
  //   const initialChat = {
  //     User: { auth: 'translator', username: anothername }, // 번역가 이름 받아오기 (auth는 translator로 고정)
  //     chat: `안녕하세요. 고객님 ${name} 번역가님과 연결 되셨습니다. 궁금한 점을 물어보세요`, // chat 내용 받아오기
  //     id: -1, // id는 default이니까 그냥 겹칠 일 없는 -1로 둠
  //     createdAt: '2022-01-10T02:04:54.000Z', // 생성할 때의 시간 가져오기
  //     updatedAt: '2022-01-10T02:04:54.000Z',
  //   }
  //   setChatContents([initialChat, ...chatContents])
  //   makeSectionByDate([initialChat, ...chatContents])
  // }, [name])

  // chatting web socket
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
    try {
      await apis.finishEstimate(roomId)
    } catch (error) {
      console.error(error)
      // 이미 확정하셨습니다. 알림창
    }
  }

  const handleConfirmTranslator = async () => {
    await clientAPIs.TranslatorConfirmed(roomId)
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

  // 채팅 시 bottom에 focus 되도록
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  return (
    <>
      <SubPageHeader
        leftTitle={anothername}
        call={auth === 'client' ? '번역가' : '유저'}
        useButton
        buttonLabel={auth === 'client' ? '확정하기' : '작업완료'}
        buttonEvent={
          auth === 'client' ? handleConfirmTranslator : handleFinishWork
        }
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
      <AlwaysScrollToBottom />
    </>
  )
}

const ChatWrap = styled.div`
  height: 100%;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  padding: 80px 16px 0 16px;
  gap: 8px;
  background-color: var(--light-gray);
  overflow-y: auto;
`

export default Chat
