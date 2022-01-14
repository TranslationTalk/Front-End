/*
  채팅날짜경계
  date: 채팅 날짜 "2022-01-15T04:33:14.000Z" //string
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const week = ['일', '월', '화', '수', '목', '금', '토']
const ChatDate = ({ date }) => {
  const dateFilter = date.match(/.+(?=T)/g)
  const chatYear = new Date(dateFilter).getFullYear()
  const chatMonth = new Date(dateFilter).getMonth() + 1
  const chatDate = new Date(dateFilter).getDate()
  const day = week[new Date(dateFilter).getDay()]
  return <Chat>{`${chatYear}년 ${chatMonth}월 ${chatDate}일 ${day}요일`}</Chat>
}

const Chat = styled.p`
  text-align: center;
`

ChatDate.propTypes = {
  date: PropTypes.string,
}

export default ChatDate
