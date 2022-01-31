/*
  채팅날짜경계
  date: 채팅 날짜 "2022-01-15T04:33:14.000Z" //string
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const week = ['일', '월', '화', '수', '목', '금', '토']

const ChatDate = ({ date }) => {
  const chatYear = date.split('-')[0]
  const chatMonth = date.split('-')[1]
  const chatDate = date.split('-')[2]
  const day = week[new Date(date).getDay()]

  return (
    <Wrap>
      <Line />
      <Chat>{`${chatYear}. ${chatMonth}. ${chatDate}. ${day}요일`}</Chat>
      <Line />
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray-bc);
`

const Chat = styled.p`
  width: fit-content;
  min-width: 160px;
  text-align: center;
  color: var(--gray-bc);
`

ChatDate.propTypes = {
  date: PropTypes.string,
}

export default ChatDate
