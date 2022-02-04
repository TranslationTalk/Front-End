import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ChatBalloon,
  ChatDate,
  ChatForm,
  InitialChat,
  SubPageHeader,
} from '../../components'
import { apis } from '../../utils/axios'
import DefaultProfile from '../../assets/images/ListThumb.png'
import io from 'socket.io-client'
import styled from 'styled-components'

const Chat = () => {
  const {
    state: {
      estimateId,
      requestId,
      roomId,
      anothername,
      createdTime,
      translatorImg,
    }, // isText와 offerPrice은 보류
  } = useLocation()
  const [chatContents, setChatContents] = useState([]) // 모든 채팅 내용
  const [chatSections, setChatSections] = useState([]) // 날짜별로 묶은 채팅
  const [chatText, setChatText] = useState('') // 채팅 하나
  const auth = sessionStorage.getItem('auth')

  useEffect(() => {
    const createAndFetchChatroom = async () => {
      const {
        data: { data },
      } = await apis.getChatContents(roomId)
      console.log(data)

      setChatContents(data)
      makeSectionByDate(data)
    }

    createAndFetchChatroom()

    // 이름 가져오기.
    // 지금은 여기서 fetching을 하지만, 이게 아니라 클라이언트에서 받아오거나
    // 처음 로그인했을 때 정보를 저장해두었다가 가져와야 한다.
    const getMyInfo = async () => {
      const {
        data: { data },
      } = await apis.getTranslatorMypage()
      console.log(data)
      // setName(data.name)
    }
    if (auth === 'translator') {
      // translator 일 때만 info를 가져올 수 있으므로
      getMyInfo()
    }
  }, [])

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
    // 직접 작업 완료하는 것은 보류
    // try {
    //   await apis.finishEstimate(estimateId)
    // } catch (error) {
    //   console.error(error)
    //   // 이미 확정하셨습니다. 알림창
    // }
    console.log(estimateId)
  }

  const handleConfirmTranslator = async () => {
    // 직접 확정하는 것은 보류
    // await clientAPIs.TranslatorConfirmed(requestId, estimateId)
    console.log(estimateId, requestId)
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
        useButton={false}
        buttonLabel={auth === 'client' ? '확정하기' : '작업완료'}
        buttonEvent={
          auth === 'client' ? handleConfirmTranslator : handleFinishWork
        }
      />
      <ChatWrap>
        <InitialChat
          auth={auth}
          name={anothername}
          createdAt={createdTime}
          isText={true}
          price={120000}
        />
        {Object.entries(chatSections).map(([date, chatData]) => (
          <div key={date}>
            <ChatDate date={date} />
            {chatData.map(chatContent => (
              <ChatBalloon // 처음 요소는 번역톡 알림 컴포넌트 추가해서 넣어주어야 할 듯
                key={chatContent.id}
                name={anothername}
                profileUrl={translatorImg ? translatorImg : DefaultProfile}
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
  padding-top: 80px;
  gap: 8px;
  background-color: var(--light-gray);
  padding-bottom: 54px;
`

export default Chat
