import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EstimateCard,
  NavigationTranslator,
  PageHeader,
  ToggleMenu,
  TopDownButton,
} from '../../components'
import { apis } from '../../utils/axios'

const MyTranslationList = () => {
  const navigate = useNavigate()
  const [estimates, setEstimates] = useState([])

  useEffect(() => {
    const fetchEstimates = async () => {
      const {
        data: { data },
      } = await apis.fetchMyList()
      setEstimates(data)
    }
    fetchEstimates()
  }, [])

  const handleClick = estimate => {
    navigate(`/translator/estimate/${estimate.id}`, {
      state: {
        estimate,
      },
    })
  }

  return (
    <div>
      <PageHeader title="내 번역" />
      {/* toggle menu 목록 바뀌어야 함 */}
      <ToggleMenu />
      {/* status (진행 중 , 완료 이런 것 뜰 수 있도록 수정해야함) */}
      {estimates.map(estimate => (
        <EstimateCard
          key={estimate.id}
          userName={estimate.User.username}
          field={estimate.field}
          beforeLanguage={estimate.beforeLanguage}
          afterLanguage={estimate.afterLanguage}
          isText={estimate.isText}
          deadline={estimate.deadline}
          onClick={() => handleClick(estimate)}
          status={estimate.status}
        />
      ))}
      <NavigationTranslator />
      <TopDownButton />
    </div>
  )
}

export default MyTranslationList
