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
import { StatusMessage, Tag } from '../index'
import { timeMessage } from '../../utils/timeCalculation'

const EstimateCard = prop => {
  const {
    field,
    beforeLanguage,
    afterLanguage,
    isText,
    deadline, //희망날짜
    createdTime, //생성날짜
    onClick,
  } = prop

  return (
    <Card onClick={onClick} createdTime={createdTime}>
      {/* 첫째줄 field, tag*/}
      <div>
        <h3>{field}</h3>
        <Tag
          text={isText ? '텍스트 번역 의뢰' : '영상 번역 의뢰'}
          color="#fff"
          bgColor="#3D51FF"
        />
        {isText}
      </div>

      {/* 둘째줄 language, icon*/}
      <div>
        <div>
          <span>{beforeLanguage}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M13.3416 9.16675H3.33325V10.8334H13.3416V13.3334L16.6666 10.0001L13.3416 6.66675V9.16675Z"
              fill="#3D51FF"
            />
          </svg>
          <span>{afterLanguage}</span>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
            fill="black"
          />
        </svg>
      </div>

      {/* 셋째줄 희망날짜, 마감시간*/}
      <div>
        <span>
          <span>희망날짜</span>
          <span>{deadline.replace(/-/g, '.')}</span>
        </span>
        {createdTime ? (
          <span>
            {createdTime && (
              <StatusMessage
                text={timeMessage(createdTime)}
                color="red"
                icon="alarm"
              />
            )}
          </span>
        ) : null}
      </div>
    </Card>
  )
}

const Card = styled.li`
  margin: 8px 20px;
  background: #fff;
  padding: 0 8px;
  border-radius: 4px;
  border: 2px solid #fff;
  transition: all 0.5s;
  cursor: pointer;
  & h3 {
    font-weight: bold;
    font-size: var(--fs-18);
  }
  & svg {
    margin: 0 4px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
  }

  & > div:first-child p {
    font-size: var(--fs-12);
  }
  & > div:nth-child(2) {
    border-top: 1px dashed var(--gray-c4);
    border-bottom: 1px dashed var(--gray-c4);
    font-size: var(--fs-14);
    line-height: 20px;
    & > div {
      display: flex;
    }
    & > svg {
      transform: translateX(-5px);
      transition: all 0.5s;
    }
  }
  & > div:last-child > span {
    width: ${prop => (prop.createdTime ? 'auto' : '100%')};
    color: ${prop => prop.createdTime ?? 'var(--orange-red)'};
    display: flex;
    justify-content: space-between;
    font-size: var(--fs-12);
    &:first-child {
      font-weight: lighter;
    }
  }
  &:hover {
    border: 2px solid rgba(61, 81, 255, 0.6);
    & > div:nth-child(2) > svg {
      transform: translateX(0px);
    }
  }
`

EstimateCard.propTypes = {
  field: PropTypes.string,
  beforeLanguage: PropTypes.string,
  afterLanguage: PropTypes.string,
  isText: PropTypes.bool,
  deadline: PropTypes.string,
  createdTime: PropTypes.string,
  onClick: PropTypes.func,
}

export default EstimateCard
