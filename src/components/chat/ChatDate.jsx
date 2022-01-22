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

  return <Chat>{`${chatYear}. ${chatMonth}. ${chatDate}. ${day}요일`}</Chat>
}

const Chat = styled.p`
  text-align: center;
`

ChatDate.propTypes = {
  date: PropTypes.string,
}

export default ChatDate
