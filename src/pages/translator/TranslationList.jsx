import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EstimateCard, PageHeader } from '../../components'
import { apis } from '../../utils/axios'

const TranslationList = () => {
  const [estimates, setEstimates] = useState([])
  const navigate = useNavigate()

  // mobx에서 mobx에 있는 함수를 사용해서 비동기 처리해야함
  // 그 함수로 useEffect 안에도 넣고, PageHeader의 reloadEvent에도 넣어야 한다.
  useEffect(() => {
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await apis.estimatesList() // sendEstimate이것으로 바꿔야 하나 지금 프로필을 만들 수 없어 임시로 client 요청하는 중
      console.log(data)
      setEstimates(data)
    }
    fetchEstimateList()
  }, [])

  const handleClick = estimate => {
    navigate('/translator/estimate/form', {
      state: {
        estimate,
      },
    })
  }

  return (
    <div>
      <PageHeader title="번역 리스트" useReloadButton />
      <p>나중에 필터 기능 들어갈 곳</p>
      <h2>곧 마감되는 요청!(마감임박 순 구현 필요)</h2>
      {estimates.slice(0, 2).map(estimate => (
        <EstimateCard
          key={estimate.id}
          userName={estimate.User.username}
          field={estimate.field}
          beforeLanguage={estimate.beforeLanguage}
          afterLanguage={estimate.afterLanguage}
          isText={estimate.isText}
          deadline={estimate.deadline}
          createdTime={estimate.createdAt}
          onClick={() => handleClick(estimate)}
        />
      ))}
      <h2>번역의뢰 리스트</h2>
      {estimates.map(estimate => (
        <EstimateCard
          key={estimate.id}
          userName={estimate.User.username}
          field={estimate.field}
          beforeLanguage={estimate.beforeLanguage}
          afterLanguage={estimate.afterLanguage}
          isText={estimate.isText}
          deadline={estimate.deadline}
          createdTime={estimate.createdAt}
          onClick={() => handleClick(estimate)}
        />
      ))}
    </div>
  )
}

export default TranslationList
