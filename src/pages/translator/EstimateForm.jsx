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
          <SectionTitle>번역 상세 요청</SectionTitle>
          <CommentBox comment={estimate.needs} />
          {estimate.youtubeUrl !== '' && (
            <VideoCard youtubeUrl={estimate.youtubeUrl} />
          )}
        </RequestInfo>
        <Form onSubmit={handleSubmit}>
          <SectionTitle>의뢰자에게 전하는 말</SectionTitle>
          <TextAreaInput
            id="comment"
            placeholder="번역가님의 한마디를 해주세요."
            onChange={handleChange}
          />
          <InputWrap>
            <SectionTitle>목표일정</SectionTitle>
            <div>
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
            <SectionTitle>견적금액</SectionTitle>
            <div>
              <TextInput
                id="offerPrice"
                onChange={handleChange}
                placeholder="￦0 "
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

const SectionTitle = styled.h3`
  font-size: var(--fs-14);
  font-weight: 500;
  margin-bottom: 12px;
`

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${Line} {
    margin-top: 19px;
    margin-bottom: 12px;
  }
  & > div:nth-child(4),
  & > div:nth-child(5) {
    margin-bottom: 20px;
  }
`

const Form = styled.form`
  & > textarea {
    margin-bottom: 18px;
  }
  ${Line} {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: var(--gray-bc);
  }
`

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  ${SectionTitle} {
    font-weight: normal;
    margin-bottom: 0;
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
