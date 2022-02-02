import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  StarsInput,
  StatusMessage,
  SubPageHeader,
  TextAreaInput,
} from '../../components'
import { clientAPIs } from '../../utils/axios'

const ReviewForm = () => {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')
  const location = useLocation()
  const [checkForm, setCheckForm] = useState({
    score: true,
    textLength: true,
  })

  //! form 입력 하지 않았을 시 메시지
  const formMessage = (type, message) => {
    return type ? null : (
      <StatusMessage text={message} icon="info" color="#FF5F5F" />
    )
  }

  //! 비동기처리: 번역가 리뷰 등록
  const postReview = async e => {
    e.preventDefault()
    let check = Object.assign({}, checkForm)
    // 별점
    score == 0 ? (check.score = false) : (check.score = true)
    // 최소 10글자 이상 뎃글 입력
    comment.length < 10 ? (check.textLength = false) : (check.textLength = true)
    setCheckForm(check)

    // 필수요소 입력 완료시 서버에 전송
    if (!Object.entries(check).find(value => value[1] === false)) {
      await clientAPIs.writeReview(location.state.requestId, {
        comment,
        score,
      })
      navigate(-1)
    }
  }
  // setComment
  const onChange = e => setComment(e.target.value)

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
      {formMessage(checkForm.score, '별점을 선택해 주세요')}
      {formMessage(checkForm.textLength, '최소 10글자 이상 입력해주세요.')}
      <div>
        <Button
          content="취소하기"
          bgColor="#C4C4C4"
          onClick={() => history.back()}
        />
        <Button content="등록하기" onClick={postReview} />
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
