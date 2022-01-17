import React, { useState } from 'react'
import {
  Button,
  SubPageHeader,
  SummaryCard,
  TextAreaInput,
  TextInput,
  VideoCard,
} from '../../components'

const EstimateForm = () => {
  const [formData, setFormData] = useState({
    comment: '',
    confirmedDate: '',
    confirmedPrice: '',
  })

  const handleChange = e => {
    const { id, value } = e.target
    console.log(id, value)
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = () => {
    // 필요
  }

  return (
    <form onSubmit={handleSubmit}>
      <SubPageHeader title="견적서 작성" />
      <h2>견적서</h2>
      <SummaryCard
        userName={'요청자'}
        field={'논문'}
        beforeLanguage={'한국어'}
        afterLanguage={'영어'}
        needs={'빨리 해주세요.'}
        deadline={'2022-02-20'}
        isText={true}
        fileUrl={'url'}
      />
      <VideoCard youtubeUrl="https://www.youtube.com/watch?v=DbXVJIrn9W0&t=72" />
      <TextAreaInput
        id="comment"
        placeholder="번역가님의 한마디를 해주세요."
        onChange={handleChange}
      />
      <h2>목표일정</h2>
      <TextInput id="confirmedDate" onChange={handleChange} />
      <h2>금액</h2>
      <TextInput id="confirmedPrice" onChange={handleChange} />
      <span>원</span>
      <Button longBtn content="견적 보내기" />
    </form>
  )
}

export default EstimateForm
