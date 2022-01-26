/*
리뷰카드입니다.
userName: 작성자의 이름 //string
score: 평점 //number
comment: 코맨트 //string
date: 리뷰 작성날짜 '2022-01-15T04:33:14.000Z' //string
*/
import React from 'react'
import PropTypes from 'prop-types'
import star from '../../assets/images/grade.svg'
import profile from '../../assets/images/TranslatorProfile.png'
import styled from 'styled-components'

const ReviewCard = ({ userName, score, comment, date }) => {
  return (
    <Card score={score}>
      <div>
        <img src={profile} alt={userName} />
        <div>
          <h4>{userName}</h4>
          <p>
            <span className="score">
              {score}
              {/* 점수가 한자리수 이면 '.0' 추가*/}
              {score.length == 1 || '.0'}
            </span>
            <span className="date">
              {/* 2022-10-10 -> 22.10.10 */}
              {date.replace(/-/g, '.').slice(2, date.length)}
            </span>
          </p>
        </div>
      </div>
      <p>{comment}</p>
    </Card>
  )
}

const Card = styled.div`
  margin: 0 20px;
  padding: 8px 0;
  border-bottom: 1px solid var(--gray-c4);
  h4 {
    margin-left: 2px;
    font-size: var(--fs-16);
  }
  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
  > div {
    display: flex;
  }
  p {
    font-size: var(--fs-12);
    line-height: 1.4;
    span {
      line-height: 20px;
    }
    .score {
      font-weight: 500;
      &::before {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 2px;
        margin-bottom: -1px;
        background-image: url(${star});
        background-size: cover;
        content: '';
      }
    }
    .date {
      color: var(--gray-c4);
      font-weight: 400;
      &::before {
        display: inline-block;
        margin: 0 5px;
        width: 1px;
        height: 10px;
        background-color: #464646;
        content: '';
      }
    }
  }
`

ReviewCard.propTypes = {
  score: PropTypes.number,
  comment: PropTypes.string,
  date: PropTypes.string,
  userName: PropTypes.number,
}

export default ReviewCard
