/*
  가격을 중점적으로 보여주는 카드
  displayPrice: 가격을 숫자로 받는다.
  label: 가격에 대한 설명을 적는다. ex) 최저가, 최고가
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PriceCard = ({ displayPrice, label }) => {
  return (
    <Card>
      <span>{label}</span>
      <p>
        {displayPrice.toLocaleString('ko-KR')} <span>원</span>
      </p>
    </Card>
  )
}

const Card = styled.div`
  margin: 10px;
  background: #ddd;
  padding: 20px;
  border-radius: 5px;
  & p {
    margin-top: 50px;
    text-align: right;
    font-weight: bold;
    font-size: 30px;
    & span {
      font-size: 18px;
    }
  }
`

PriceCard.propTypes = {
  displayPrice: PropTypes.number,
  label: PropTypes.string,
}

export default PriceCard
