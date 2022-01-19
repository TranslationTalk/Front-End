/*
번역가가 보낸 견적서 Card
name : 번역가 이름 
profileUrl : 프로필url 부모 컨포넌트에서 이미지를 import해온것을 넣어야함
totalTrans :  번역가의 총 번역 건수
totalReivews : 번역가의 총 리뷰 갯수
offerPrice : 번역가가 제안한 가격
confirmedDate : 완료가능한 날짜
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const EstimateCardMin = prop => {
  const {
    name,
    profileUrl,
    totalTrans,
    totalReivews,
    offerPrice,
    confirmedDate,
    onClick,
  } = prop

  return (
    <Card onClick={onClick}>
      <img src={profileUrl} alt={name} />
      <div>
        <p>
          <b>{name}</b> 번역가 님
        </p>
        <p>
          번역 <b>{totalTrans}</b>건
        </p>
        <p>
          리뷰 <b>{totalReivews}</b>건
        </p>
        <p>
          <b>{Intl.NumberFormat('ko-KR').format(offerPrice)}</b>
        </p>
        <p>
          납기 가능 날짜: <b>{confirmedDate}</b>
        </p>
      </div>
    </Card>
  )
}
const Card = styled.div`
  display: flex;
  margin: 10px;
  background: #ddd;
  padding: 20px;
  border-radius: 5px;
  & b{
    font-weight: bold;
  }
  & img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right 10px;
    object-fit: cover;
  }
`

EstimateCardMin.propTypes = {
  name: PropTypes.string,
  profileUrl: PropTypes.string,
  totalTrans: PropTypes.number,
  totalReivews: PropTypes.number,
  offerPrice: PropTypes.number,
  confirmedDate: PropTypes.string,
  onClick: PropTypes.func,
}

export default EstimateCardMin
