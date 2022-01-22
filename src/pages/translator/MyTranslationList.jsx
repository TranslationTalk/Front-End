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

const menu = ['보낸 견적', '진행중', '진행 완료']

const MyTranslationList = () => {
  const navigate = useNavigate()
  const [estimates, setEstimates] = useState([])
  const [clickedStatus, setClickedStatus] = useState('ready')
  const [clickNumber, setClickNumber] = useState(-1)

  useEffect(() => {
    const fetchEstimates = async () => {
      const {
        data: { data },
      } = await apis.fetchMyList()
      setEstimates(data)
      console.log(data)
    }
    fetchEstimates()
    // 필터 적용
    setClickNumber(0)
  }, [])

  const handleClick = estimate => {
    navigate(`/translator/estimate/${estimate.id}`, {
      state: {
        estimate,
      },
    })
  }

  const handleToggleMenu = number => setClickNumber(number)

  // ToggleMenu filter
  useEffect(() => {
    console.log(clickNumber)
    switch (clickNumber) {
      case 0:
        // 보낸 견적 (ready)
        setClickedStatus('ready')
        break
      case 1:
        // 진행 중 (processing)
        setClickedStatus('processing')
        break
      case 2:
        // 진행 완료 (done)
        setClickedStatus('done')
        break
      default:
        setClickedStatus('ready')
        return
    }
  }, [clickNumber])

  return (
    <div>
      <PageHeader title="내 번역" />
      {/* toggle menu 목록 onClick으로 내려주어야 함 */}
      <ToggleMenu menu={menu} click={clickNumber} onClick={handleToggleMenu} />
      {estimates
        .filter(el => el.status === clickedStatus)
        .map(estimate => (
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
