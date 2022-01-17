import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Button,
  SubPageHeader,
  SummaryCard,
  TextAreaInput,
  TextInput,
  VideoCard,
} from '../../components'
import { apis } from '../../utils/axios'

const EstimateForm = () => {
  const {
    state: { estimate },
  } = useLocation()

  const [formData, setFormData] = useState({
    comment: '',
    confirmedDate: '',
    offerPrice: '',
  })

  const handleChange = e => {
    const { id, value } = e.target
    console.log(id, value)
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // 필요
    console.log(formData)
    const { res } = await apis.sendEstimate(estimate.id, formData)
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit}>
      <SubPageHeader title="견적서 작성" />
      <h2>견적서</h2>
      <SummaryCard
        userName={estimate.clientId.toString()}
        field={estimate.field}
        beforeLanguage={estimate.beforeLanguage}
        afterLanguage={estimate.afterLanguage}
        needs={estimate.needs}
        deadline={estimate.deadline}
        isText={estimate.isText}
        fileUrl={estimate.fileUrl}
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
      <TextInput id="offerPrice" onChange={handleChange} />
      <span>원</span>
      {/* type submit 적용하기 */}
      <Button longBtn content="견적 보내기" />
    </form>
  )
}

export default EstimateForm
