import React, { useEffect, useState } from 'react'
import { EstimateCard, PageHeader } from '../../components'
import { apis } from '../../utils/axios'

const TranslationList = () => {
  const [estimates, setEstimates] = useState([])

  // mobx에서 mobx에 있는 함수를 사용해서 비동기 처리해야함
  // 그 함수로 useEffect 안에도 넣고, PageHeader의 reloadEvent에도 넣어야 한다.
  useEffect(() => {
    const fetchRequestList = async () => {
      const {
        data: { data },
      } = await apis.requestList()
      console.log(data)
      setEstimates(data)
    }
    fetchRequestList()
  }, [])

  return (
    <div>
      <PageHeader title="번역 리스트" useReloadButton />
      <p>나중에 필터 기능 들어갈 곳</p>
      <h2>곧 마감되는 요청!(마감임박 순 구현 필요)</h2>
      {estimates.map(estimate => (
        <EstimateCard
          key={estimate.id}
          userName={estimate.clientId.toString()} // userName DB에 없음..
          field={estimate.field}
          beforeLanguage={estimate.beforeLanguage}
          afterLanguage={estimate.afterLanguage}
          isText={estimate.isText}
          deadline={estimate.deadline}
        />
      ))}
      <h2>번역의뢰 리스트</h2>
      {estimates.map(estimate => (
        <EstimateCard
          key={estimate.id}
          userName={estimate.clientId.toString()} // userName DB에 없음..
          field={estimate.field}
          beforeLanguage={estimate.beforeLanguage}
          afterLanguage={estimate.afterLanguage}
          isText={estimate.isText}
          deadline={estimate.deadline}
        />
      ))}
    </div>
  )
}

export default TranslationList
