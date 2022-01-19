/*
  Client 
  견적요청 form -> 견적요청List -> 받은 견적List -> 번역가 상세페이지*
  번역가 상세페이지
*/
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { clientAPIs } from '../../utils/axios'
import {
  Button,
  EstimateCardMin,
  EstimateDetail,
  PageHeader,
  ToggleMenu,
} from '../../components'

const TranslatorDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [estimate, setEstimate] = useState([])

  //비동기처리
  useEffect(() => {
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await clientAPIs.requestEstimate(
        location.state.requestId,
        location.state.estimateId,
      )
      setEstimate(data)
    }
    fetchEstimateList()
  }, [])

  // 채팅방 생성
  // 상담하기 Btn
  const consultBtn = () => {
    if (estimate.roomId === 0) {
      clientAPIs
        .addChatroom(location.state.estimateId)
        .then(() => alert(`roomId ${location.state.estimateId}번 생성`))
        .catch(e => alert(`${e}`))
      navigate(`/chat/${estimate.roomId}`)
    } else {
      navigate(`/chat/${estimate.roomId}`)
    }
  }

  return (
    <div>
      <PageHeader title="" />
      <EstimateCardMin
        name={estimate.name}
        profileUrl={estimate.profileUrl}
        totalTrans={estimate.totalTrans}
        totalReivews={estimate.totalReviews}
        offerPrice={estimate.offerPrice}
        confirmedDate={estimate.confirmedDate}
      />
      <ToggleMenu menu={['번역 견적', '번역가님 리뷰']} />
      <EstimateDetail
        offerPrice={estimate.offerPrice ?? 0}
        comment={estimate.comment ?? 'test'}
        confirmedDate={estimate.confirmedDate}
      />
      <Button content="상담하기" _onClick={consultBtn} />
    </div>
  )
}

export default TranslatorDetail
