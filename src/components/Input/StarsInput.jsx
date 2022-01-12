/*
common input component:
stars(별점)를 정해주는 input form

사용하고자 하는 컴포넌트에서 사용법
현재 별점 개수를 나타내는 currentStar를 state로 관리
currentValue에는 현재 별점을 나타내는 currentStar를 할당
onClick에는 (star) => setCurrentStar(star) 현재 별점을 클릭된 별점으로 바꾸어 주는 함수 할당
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const starsArr = [1, 2, 3, 4, 5]

const StarsInput = ({ placeholder, currentValue, onClick }) => {
  return (
    <Container>
      <Stars>
        {starsArr.map(star => (
          <Star
            key={star}
            starColor={star > currentValue ? 'gray' : 'gold'}
            onClick={() => onClick(star)}
          />
        ))}
        <span>{currentValue}</span>
      </Stars>
      <p>{placeholder}</p>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Stars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Star = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.starColor};
  margin: 5px;
`

StarsInput.propTypes = {
  placeholder: PropTypes.string,
  currentValue: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default StarsInput
