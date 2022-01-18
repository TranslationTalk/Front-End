import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, SubPageHeader, SummaryCard, VideoCard } from '../../components'
import { apis } from '../../utils/axios'

const TranslatorEstimateDetail = () => {
  const {
    state: { estimate },
  } = useLocation()
  const [estimateDetail, setEstimateDetail] = useState(null)
  useEffect(() => {
    const fetchEstimate = async () => {
      const {
        data: { data },
      } = await apis.getEstimate(estimate.id)
      console.log(data)
      setEstimateDetail(data)
    }
    fetchEstimate()
  }, [])

  return (
    <div>
      <SubPageHeader title="견적서" />
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
      <h2>목표 일정</h2>
      <p>{estimateDetail?.confirmedDate}</p>
      <h2>금액</h2>
      <p>{estimateDetail?.offerPrice}</p>
      <Button longBtn content="상담하기" />
    </div>
  )
}

export default TranslatorEstimateDetail
