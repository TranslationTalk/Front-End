/*
  Client 
  견적요청 form -> 견적요청List -> 받은 견적List -> 번역가 상세페이지*
  번역가 상세페이지
*/
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  EstimateCardMin,
  EstimateDetail,
  PageHeader,
  ToggleMenu,
} from '../../components'
import { clientAPIs } from '../../utils/axios'

const TranslatorDetail = () => {
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
    </div>
  )
}

export default TranslatorDetail
