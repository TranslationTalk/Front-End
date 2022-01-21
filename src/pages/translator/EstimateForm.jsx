import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
    <form onSubmit={handleSubmit}>
      <SubPageHeader title="견적서 작성" />
      <h2>견적서</h2>
      <SummaryCard
        userName={estimate.User.username}
        field={estimate.field}
        beforeLanguage={estimate.beforeLanguage}
        afterLanguage={estimate.afterLanguage}
        needs={estimate.needs}
        deadline={estimate.deadline}
        isText={estimate.isText}
        fileUrl={estimate.fileUrl}
      />
      {estimate.youtubeUrl && <VideoCard youtubeUrl={estimate.youtubeUrl} />}
      <TextAreaInput
        id="comment"
        placeholder="번역가님의 한마디를 해주세요."
        onChange={handleChange}
      />
      <h2>목표일정</h2>
      <TextInput id="confirmedDate" onChange={handleChange} type="date" />
      <h2>금액</h2>
      <TextInput id="offerPrice" onChange={handleChange} />
      <span>원</span>
      <Button content="견적 보내기" />
    </form>
  )
}

export default EstimateForm
