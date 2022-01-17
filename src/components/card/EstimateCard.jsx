/*
  유저보낸 견적요청에 대한 세부사항을 포함하고 있는 Card
  userName: 유저 이름 //string
  field: 분야 //string
  beforeLanguage: 번역전 언어 //string
  afterLanguage: 번역후 언어 //string
  isText: 번역할 언어가 text이면 true, youtube이면 false // bool
  deadline: 요청 마감 날짜 "2022-01-10T04:33:14.000Z" //string 
  offerPrice: 요청 가격 //number
  onClick: 카드를 클릭했을 때 발생하는 이벤트 함수. 이동하려면 안에 navigate를 담고 있으면 됩니다 // func
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StatusMessage } from '../index'

// 현재시간
const currentTime = new Date()
const date = currentTime.getDate()
const hour = currentTime.getHours()
const min = currentTime.getMinutes()

const EstimateCard = prop => {
  const {
    userName,
    field,
    beforeLanguage,
    afterLanguage,
    isText,
    deadline,
    offerPrice,
    onClick,
  } = prop

  // 마감날짜
  const deadlineDate = deadline.match(/.+(?=T)/g)
  const deadlineDay = new Date(deadline).getDate()
  const deadlineHour = new Date(deadline).getHours()
  const deadlineMin = new Date(deadline).getMinutes()

  // 남은 시간
  let countDay = deadlineDay - date
  let countHour = deadlineHour - hour
  let countMin = deadlineMin - min

  // 메시지
  let timeMessage
  if (countMin < 0) {
    countHour--
    countMin += 60
  }
  if (countHour < 0) {
    countDay--
    countHour += 24
  }
  if (countDay < 0) {
    timeMessage = '견적 기간이 끝났습니다.'
  } else {
    timeMessage = `남은 시간 ${countDay}일 ${countHour}시간 ${countMin}분`
  }

  return (
    <Card onClick={onClick}>
      <p>{userName} 님의 요청</p>
      <p>{field}</p>
      <p>
        {beforeLanguage} &#62; {afterLanguage}
      </p>
      <p>{isText}</p>
      <p>{`${deadlineDate} (${deadlineHour}시${deadlineMin}분)`}</p>
      {offerPrice && <p>{offerPrice.toLocaleString('ko-KR')} 원</p>}
      <StatusMessage text={timeMessage} color="red" icon="!" />
    </Card>
  )
}

const Card = styled.div`
  margin: 10px;
  background: #ddd;
  padding: 20px;
  border-radius: 5px;
`

EstimateCard.propTypes = {
  userName: PropTypes.string,
  field: PropTypes.string,
  beforeLanguage: PropTypes.string,
  afterLanguage: PropTypes.string,
  isText: PropTypes.bool,
  deadline: PropTypes.string,
  offerPrice: PropTypes.number,
  onClick: PropTypes.func,
}

export default EstimateCard
