import React, { useEffect, useState } from 'react'
import { EstimateCard, PageHeader } from '../../components'
import { apis } from '../../utils/axios'

const TranslationList = () => {
  const [estimates, setEstimates] = useState([])
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
      {estimates.map(estimate => (
        <EstimateCard
          key={estimate.id}
          userName={estimate.clientId}
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
