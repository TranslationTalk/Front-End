/*
  견적서 내용 카드
  userName: 유저의 이름 //string
  field: 분야 //string
  beforeLanguage: 번역이전언어 //string
  afterLanguage:  번역이후언어 //string
  isText: 번역할것이 text면 true/ youtube영상이면 false //bool
  deadline: 마감날짜 '2022-01-10T04:33:14.000Z' //string
  fileUrl: text또는 youtubeurl //string
  needs: 고객 세부 요청 사항 text // string
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../index'
import { ReactComponent as ClipIcon } from '../../assets/icons/Clip.svg'

const SummaryCard = prop => {
  const {
    userName,
    field,
    beforeLanguage,
    afterLanguage,
    isText,
    deadline,
    fileUrl,
    needs,
  } = prop

  return (
    <Card>
      <div>
        <span>요청자</span>
        <span>{userName}</span>
      </div>
      <div>
        <span>번역 주제</span>
        <span>{field}</span>
      </div>
      <div>
        <span>번역 전 언어</span>
        <span>{beforeLanguage}</span>
      </div>
      <div>
        <span>번역 후 언어</span>
        <span>{afterLanguage}</span>
      </div>
      <div>
        <span>번역 상세 요청</span>
        <span>{needs}</span>
      </div>
      <div>
        <span>마감기한</span>
        <span>{deadline}</span>
      </div>
      {isText && (
        <div>
          <span>파일 다운로드</span>
          <a href={fileUrl} download>
            <ClipIcon />
            <Button content="파일 받기" />
          </a>
        </div>
      )}
    </Card>
  )
}

const Card = styled.div`
  margin: 10px;
  background: var(--white);
  width: 100%;
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--gray-c4);
    border-radius: 4px;
    width: 150px;
    transition: all 0.5s;
    & > button {
      width: fit-content;
      font-size: var(--fs-14);
      color: var(--main-color);
      background-color: var(--white);
      border: none;
      margin-right: 10px;
    }
  }
  & a:hover {
    border: 1px solid var(--main-color);
  }
  & p {
    margin: 5px 0;
    & span {
    }
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--fs-14);
    color: var(--gray);
    margin-bottom: 12px;
    span:last-child {
      font-weight: 500;
      color: #000;
    }
  }
`

SummaryCard.propTypes = {
  userName: PropTypes.string,
  field: PropTypes.string,
  beforeLanguage: PropTypes.string,
  afterLanguage: PropTypes.string,
  isText: PropTypes.bool,
  deadline: PropTypes.string,
  fileUrl: PropTypes.string,
  needs: PropTypes.string,
}

export default SummaryCard
