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
        <span>{displayPrice.toLocaleString('ko-KR')}</span> <span>원</span>
      </p>
    </Card>
  )
}

const Card = styled.div`
  margin: 0 20px;
  background: #e2ecfc;
  padding: 10px;
  border-radius: 5px;
  font-weight: 500;
  & p {
    margin-top: 33px;
    text-align: right;
    font-size: var(--fs-18);
    & span:first-child {
      font-size: var(--fs-24);
      font-weight: bold;
    }
    & span:last-child {
      font-size: var(--fs-20);
      font-weight: 500;
    }
  }
`

PriceCard.propTypes = {
  displayPrice: PropTypes.number,
  label: PropTypes.string,
}

export default PriceCard
