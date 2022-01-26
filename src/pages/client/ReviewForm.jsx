import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  StarsInput,
  StatusMessage,
  SubPageHeader,
  TextAreaInput,
} from '../../components'

const ReviewForm = () => {
  const [score, setScore] = useState(0)
  const [review, setReview] = useState()
  const location = useLocation()

  const onChange = e => {
    if (e) {
      const { value, name } = e.target
      setReview({ ...review, [name]: value })
    } else {
      setReview({ ...review, score: score })
    }
  }
  console.log(location.state.requestId)
  setScore
  return (
    <ReviewFormPage>
      <SubPageHeader title="리뷰쓰기" />
      <Review>
        <h3>번역 의뢰는 어떠셨나요?</h3>
        <p>별점을 선택해 주세요.</p>
        <StarsInput currentValue={score} onClick={setScore} />
      </Review>
      <TextAreaInput
        name="comment"
        onChange={onChange}
        placeholder="최소 10글자 이상 입력해주세요."
      />
      <StatusMessage
        text="최소 10글자 이상 입력해주세요."
        color="#FF5F5F"
        icon="info"
      />
      <StatusMessage text="별점을 선택해 주세요" color="#FF5F5F" icon="info" />
      <div>
        <Button
          content="취소하기"
          bgColor="#C4C4C4"
          onClick={() => history.back()}
        />
        <Button content="등록하기" />
      </div>
    </ReviewFormPage>
  )
}
const ReviewFormPage = styled.div`
  margin: 56px 20px 0;
  > div:last-child {
    display: flex;
    margin-top: 16px;
    button:first-child {
      margin-right: 20px;
    }
  }
`
const Review = styled.div`
  text-align: center;
  padding: 82px 0;
  h3 {
    margin-bottom: 20px;
    font-size: var(--fs-20);
    font-weight: 700;
  }
  p {
    color: var(--gray-c4);
  }
  div {
    margin: auto;
  }
`

export default ReviewForm
