/*
  견적서 내용 카드
  userName: 유저의 이름 //string
  field: 분야 //string
  beforeLanguage: 번역이전언어 //string
  afterLanguage:  번역이후언어 //string
  isText: 번역할것이 text면 true/ youtube영상이면 false //bool
  deadline: 마감날짜 '2022-01-10T04:33:14.000Z' //string
  fileUrl: text또는 youtubeurl //string
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../index'

const SummaryCard = prop => {
  const {
    userName,
    field,
    beforeLanguage,
    afterLanguage,
    isText,
    deadline,
    fileUrl,
  } = prop

  return (
    <Card>
      <p>
        요청자: <span>{userName}</span>
      </p>
      <p>
        번역 주제: <span>{field}</span>
      </p>
      <p>
        번역 전 언어: <span>{beforeLanguage}</span>
      </p>
      <p>
        번역 후 언어: <span>{afterLanguage}</span>
      </p>
      <p>
        번역 상세 요청: <span>{field}</span>
      </p>
      <p>
        마감기한: <span>{deadline}</span>
      </p>
      {isText ? (
        <a href={fileUrl} download>
          <Button content="다운로드" />
        </a>
      ) : (
        <a href={fileUrl}>{fileUrl}</a>
      )}
    </Card>
  )
}

const Card = styled.div`
  margin: 10px;
  background: #ddd;
  padding: 20px;
  border-radius: 5px;
  & a {
    text-decoration: underline;
  }
  & a:hover {
    color: blue;
  }
  & p {
    margin: 5px 0;
    & span {
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
}

export default SummaryCard
