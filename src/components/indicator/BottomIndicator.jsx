/**
 * BottomIndicator
 * 견적 디테일 페이지에서 사용되는 하단에 fixed 바
 * offerPrice: 견적 가격 number (여기서 ,포함된 string으로 변경)
 * 상담하기 누르면 해당 번역가 채팅창으로 들어가야 하는데 주소가 아직 없음
 */
import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '..'

const BottomIndicator = ({ offerPrice }) => {
  return (
    <Container>
      <span>{offerPrice.toLocaleString()}원</span>
      <Button shortBtn content="상담하기" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: tan;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  & span {
    font-size: 1.7rem;
    font-weight: bold;
  }
`

BottomIndicator.propTypes = {
  offerPrice: propTypes.number.isRequired,
}

export default BottomIndicator
