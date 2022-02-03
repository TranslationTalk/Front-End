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
import basicProfil from '../../assets/images/ListThumb.png'
import { ReactComponent as Star } from '../../assets/icons/Star.svg'
import arrow from '../../assets/icons/Arrow.svg'

const EstimateCardMin = prop => {
  const {
    name,
    profileUrl,
    totalTrans,
    totalReivews,
    offerPrice,
    confirmedDate,
    onClick,
    avgReviews,
  } = prop

  return (
    <Card onClick={onClick}>
      <img src={profileUrl ?? basicProfil} alt={name} />
      <div>
        <p>
          <b>{name}</b>
          <span> 번역가 님</span>
        </p>
        <p>
          <p>
            <span>번역 {totalTrans ?? 0}건</span>
            <span>리뷰 {totalReivews ?? 0}건</span>
            <span>
              {totalReivews ? (
                <>
                  <Star fill="#FF5F5F" width="16px" height="16px" />
                  {avgReviews}
                </>
              ) : null}
            </span>
          </p>
          <i />
        </p>
        <p>
          <b>{Intl.NumberFormat('ko-KR').format(offerPrice)} 원 </b>
          <span>( {confirmedDate} 까지 )</span>
        </p>
      </div>
    </Card>
  )
}
const Card = styled.li`
  display: flex;
  margin: 0 20px;
  padding: 14px 0 11px 12px;
  border-bottom: 1px solid var(--gray-c4);
  cursor: pointer;
  & > div {
    width: 100%;
  }
  & b {
    font-weight: 500;
  }
  & img {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    margin-right: 14px;
    object-fit: cover;
  }

  /* xxx번역가 님 */
  & div > p:first-child {
    line-height: 1.4;
    & b {
      font-size: var(--fs-16);
    }
    & span {
      font-size: var(--fs-14);
      opacity: 0.4;
    }
  }

  /* 번역X건 리뷰X건 평점 */
  & div > p:nth-child(2) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    color: var(--gray);
    line-height: 1.4;
    font-size: var(--fs-12);
    & span {
      margin-right: 5px;
      svg {
        margin-bottom: -3px;
      }
      &:last-child {
        font-weight: bold;
      }
    }
    & > i {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-top: -5px;
      background-image: url(${arrow});
      transform: translateX(-5px);
      transition: all 0.5s;
      content: '';
    }
  }

  /* 요청금액 납기가능일 */
  & p:last-child {
    font-size: var(--fs-14);
    & span {
      font-size: var(--fs-12);
      color: var(--main-color);
    }
  }

  &:hover {
    & div > p:nth-child(2) > i {
      transform: translateX(0);
    }
  }
`

EstimateCardMin.propTypes = {
  name: PropTypes.string,
  profileUrl: PropTypes.string,
  totalTrans: PropTypes.number,
  totalReivews: PropTypes.number,
  avgReviews: PropTypes.number,
  offerPrice: PropTypes.number,
  confirmedDate: PropTypes.string,
  onClick: PropTypes.func,
}

export default EstimateCardMin
