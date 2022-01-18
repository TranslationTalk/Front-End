/*
  Client 
  견적요청 form -> 견적요청List* -> 받은 견적List -> 번역가 상세페이지
  견적요청List 페이지
*/
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EstimateCard,
  NavigationUser,
  PageHeader,
  ToggleMenu,
} from '../../components'
import { clientAPIs } from '../../utils/axios'

const RequestList = () => {
  const navigate = useNavigate()
  const [estimates, setEstimates] = useState([])

  // 비동기 처리
  useEffect(() => {
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await clientAPIs.requestList()
      setEstimates(data)
    }
    fetchEstimateList()
  }, [])

  // card클릭 시 받은 견적 list로 이동
  // 요청id state로 넘김
  const cardClick = num => {
    navigate('/client/estimate/list', { state: { requestId: num } })
  }

  return (
    <div>
      <PageHeader title="내 견적 요청" />
      <ToggleMenu />
      {estimates.map(estimate => (
        <EstimateCard
          key={estimate.id}
          userName={estimate.clientId.toString()}
          field={estimate.field}
          beforeLanguage={estimate.beforeLanguage}
          afterLanguage={estimate.afterLanguage}
          isText={estimate.isText}
          deadline={estimate.deadline}
          createdTime={estimate.createdAt}
          onClick={() => cardClick(estimate.id)}
        />
      ))}
      <NavigationUser />
    </div>
  )
}

export default RequestList
