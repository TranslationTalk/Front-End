/*
  Client
  견적요청 form -> 견적요청List -> 받은 견적List* -> 번역가 상세페이지
  받은 견적 List 페이지
*/
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  EstimateCardMin,
  NavigationUser,
  NoList,
  PriceCard,
  StatusMessage,
  SubPageHeader,
} from '../../components'
import { clientAPIs } from '../../utils/axios'
import { timeMessage } from '../../utils/timeCalculation'

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

  // 최저가 구하기
  const lowestPrice = () => {
    const price = estimate.map(el => el.offerPrice)
    return Math.min(...price)
  }

  return (
    <ClientEstimateListPage>
      <SubPageHeader title="받은견적" />
      {estimate.length === 0 ? (
        <NoList listName="받은 견적 리스트" />
      ) : (
        <section>
          <h2>받은 견적</h2>
          <StatusMessage
            text={timeMessage(location.state.createdTime)}
            color={'#FF5F5F'}
            icon="alarm"
          />
          <PriceCard label="견적 최저가" displayPrice={lowestPrice()} />
          <span>견적 리스트</span>
        </section>
      )}
      {estimate.map(translator => (
        <EstimateCardMin
          key={translator.estimateId}
          name={translator.name}
          profileUrl={translator.profileUrl}
          totalTrans={translator.totalTrans}
          totalReivews={translator.totalReivews}
          offerPrice={translator.offerPrice}
          confirmedDate={translator.confirmedDate}
          onClick={() =>
            cardClick(location.state.requestId, translator.estimateId)
          }
        />
      ))}
      <NavigationUser />
    </ClientEstimateListPage>
  )
}

const ClientEstimateListPage = styled.div`
  min-height: 100vh;
  padding: 56px 0 72px;
  section {
    > h2 {
      height: 44px;
      margin: 0 20px;
      line-height: 44px;
      font-size: var(--fs-18);
      font-weight: bold;
    }
    > div:nth-child(2) {
      justify-content: end;
      margin: 12px 25px 5px;
    }
    > span {
      display: block;
      font-size: var(--fs-14);
      font-weight: 500;
      margin: 37px 20px 10px;
    }
  }
`

export default ClientEstimateList
