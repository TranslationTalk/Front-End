import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  CommentBox,
  SubPageHeader,
  SummaryCard,
  TextAreaInput,
  TextInput,
  VideoCard,
} from '../../components'
import { apis } from '../../utils/axios'
import { ReactComponent as DateIcon } from '../../assets/icons/DateRange.svg'

const EstimateForm = () => {
  const {
    state: { estimate },
  } = useLocation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    comment: '',
    confirmedDate: '',
    offerPrice: '',
  })

  const handleChange = e => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // 필요
    await apis.sendEstimate(estimate.id, formData)

    navigate('/translator/translation/list')
  }

  return (
    <>
      <SubPageHeader title="견적서" />
      <Wrap>
        <h2>번역 견적 제안서</h2>
        <RequestInfo>
          <Line />
          <SummaryCard
            userName={estimate.User.username}
            field={estimate.field}
            beforeLanguage={estimate.beforeLanguage}
            afterLanguage={estimate.afterLanguage}
            deadline={estimate.deadline}
            isText={estimate.isText}
            fileUrl={estimate.fileUrl}
          />
          <CommentBox comment={estimate.needs} />
          {estimate.youtubeUrl !== '' && (
            <VideoCard youtubeUrl={estimate.youtubeUrl} />
          )}
        </RequestInfo>
        <Form onSubmit={handleSubmit}>
          <TextAreaInput
            id="comment"
            placeholder="번역가님의 한마디를 해주세요."
            onChange={handleChange}
          />
          <InputWrap>
            <h3>목표일정</h3>
            <div>
              {/* date 아이콘 오른쪽으로 옮기면 바로 될텐데..
              <label htmlFor="confirmedDate">
                <DateIcon />
              </label> */}
              <TextInput
                id="confirmedDate"
                onChange={handleChange}
                type="date"
              />
              <label htmlFor="confirmedDate">
                <DateIcon />
              </label>
            </div>
          </InputWrap>
          <Line />
          <InputWrap>
            <h3>견적금액</h3>
            <div>
              <TextInput
                id="offerPrice"
                onChange={handleChange}
                placeholder="￦0"
              />
              <span>원</span>
            </div>
          </InputWrap>
          <Line />
          <Button content="견적 보내기" />
        </Form>
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  padding: 87px 20px 90px 20px;
  h2 {
    font-size: var(--fs-18);
    font-weight: 500;
  }
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
`

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div:last-child {
    margin: 20px 0;
  }
  ${Line} {
    margin-top: 19px;
    margin-bottom: 12px;
  }
`

const Form = styled.form`
  & > textarea {
    margin-bottom: 18px;
  }
  ${Line} {
    margin-top: 5px;
    background-color: var(--gray-bc);
  }
  button {
    margin-top: 20px;
  }
`

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 27px;
  h3 {
    font-size: var(--fs-14);
  }
  input {
    width: fit-content;
    max-width: 150px;
    min-width: 50px;
    border: none;
    padding: 0;
    position: relative;
    font-size: var(--fs-14);
    margin-left: 5px;
    text-align: right;
  }
  input:focus {
    outline: none;
    border: none;
  }
  input[type='date']::-webkit-clear-button,
  input[type='date']::-webkit-inner-spin-button {
    display: none;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    margin-left: 5px;
    opacity: 0;
  }
  & > div {
    display: flex;
    align-items: center;
    position: relative;
    label {
      position: absolute;
      right: 5px;
      top: 6px;
      pointer-events: none;
    }
  }
`

export default EstimateForm
