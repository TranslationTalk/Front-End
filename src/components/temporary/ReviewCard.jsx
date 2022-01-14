/*
리뷰카드입니다.
userName: 작성자의 이름 //string
score: 평점 //number
comment: 코맨트 //string
date: 리뷰 작성날짜 '2022-01-15T04:33:14.000Z' //string
*/
import React from 'react'
import PropTypes from 'prop-types'
import grayStar from '../../assets/icons/star_score_gray.png'
import blueStar from '../../assets/icons/star_score_blue.png'
import styled from 'styled-components'

const ReviewCard = ({ userName, score, comment, date }) => {
  return (
    <Card score={score}>
      <p>{userName}</p>
      <p>
        <span className="star">
          <div className="grayStar"></div>
          <div className="blueStar"></div>
        </span>
        <span className="score">{score} 점</span>
        <span className="date">{date.match(/.+(?=T)/g)}</span>
      </p>
      <p>{comment}</p>
    </Card>
  )
}

const Card = styled.div`
  margin: 10px;
  background: #ddd;
  padding: 20px;
  border-radius: 5px;
  & span {
    line-height: 20px;
  }
  & .score {
    margin-left: 110px;
  }
  & .date {
    margin-left: 30px;
  }
  & .blueStar,
  & .grayStar {
    position: absolute;
    height: 20px;
    background-repeat: none;
    background-size: cover;
  }
  & .blueStar {
    background-image: url(${blueStar});
    width: calc(100px / 5 * ${props => props.score});
  }
  & .grayStar {
    background-image: url(${grayStar});
    width: 100px;
  }
`

ReviewCard.propTypes = {
  score: PropTypes.number,
  comment: PropTypes.string,
  date: PropTypes.string,
  userName: PropTypes.string,
}

export default ReviewCard
