import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, SubPageHeader, SummaryCard, VideoCard } from '../../components'
import { apis } from '../../utils/axios'

const TranslatorEstimateDetail = () => {
  const {
    state: { estimate },
  } = useLocation()
  const [estimateDetail, setEstimateDetail] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEstimate = async () => {
      const {
        data: { data },
      } = await apis.getEstimate(estimate.id)
      setEstimateDetail(data)
      console.log(data)
    }
    fetchEstimate()
  }, [])

  const gotoChatroom = () => {
    // chat 경로 바뀜 translator/chat/
    navigate(`/chat/${estimateDetail.roomId}`, {
      state: { roomId: estimateDetail.roomId },
    })
  }

  const finishWork = async () => {
    console.log('작업 완료')
    const data = await apis.finishEstimate(estimate.id)
    console.log(data)
    // 일단 작업 완료 후 채팅방으로 이동하는 것으로 함

    // 작업 완료하면, 채팅방에서 자동으로 '작업 완료 되었습니다.' 보내주는 기능 추가 필요
    alert('작업 완료 처리가 되었습니다.')
    navigate(`/chat/${estimateDetail.roomId}`, {
      state: { roomId: estimateDetail.roomId },
    })
  }

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
      <h2>내 코멘트</h2>
      <p>{estimateDetail?.comment}</p>
      <h2>목표 일정</h2>
      <p>{estimateDetail?.confirmedDate}</p>
      <h2>금액</h2>
      <p>{estimateDetail?.offerPrice}</p>
      {estimateDetail?.roomId === 0 ? (
        // cursor pointer 안되도록
        <Button longBtn content="상담하기" bgColor="gray" />
      ) : (
        <>
          <Button longBtn content="상담하기" _onClick={gotoChatroom} />
        </>
      )}
      {estimateDetail?.status === 'processing' ? (
        <Button longBtn content="작업완료" _onClick={finishWork} />
      ) : (
        <Button longBtn content="작업완료" bgColor="gray" />
      )}
    </div>
  )
}

export default TranslatorEstimateDetail
