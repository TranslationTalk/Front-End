/*
  Client
  견적요청 form -> 견적요청List -> 받은 견적List* -> 번역가 상세페이지
  받은 견적 List 페이지
*/
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  EstimateCardMin,
  NavigationUser,
  PageHeader,
  PriceCard,
} from '../../components'
import { clientAPIs } from '../../utils/axios'

const ClientEstimateList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [estimate, setEstimate] = useState([])

  // 비동기처리
  useEffect(() => {
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await clientAPIs.requestEstimateList(`${location.state.requestId}`)
      setEstimate(data)
    }
    fetchEstimateList()
  }, [])

  // EstimateCardMin 컴포넌트 클릭 시
  // 관련 요청의 번역가 견적 상세페이지로 이동
  const cardClick = (requestId, estimateId) => {
    navigate('/client/estimate/detail', { state: { requestId, estimateId } })
  }

  return (
    <>
      <PageHeader title="받은견적" />
      <PriceCard label="견적 최저가" displayPrice="1000000" />
      {estimate.map(translator => (
        <EstimateCardMin
          key={translator.id}
          name={translator.name}
          profileUrl={translator.profileUrl}
          totalTrans={translator.totalTrans}
          totalReivews={translator.totalReivews}
          offerPrice={translator.offerPrice}
          confirmedDate={translator.confirmedDate}
          onClick={() =>
            cardClick(location.state.requestId, translator.translatorId)
          }
        />
      ))}
      <NavigationUser />
    </>
  )
}

export default ClientEstimateList
