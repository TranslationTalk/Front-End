import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
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
    <Wrap>
      <PageHeader title="내 번역" />
      <ToggleWrap>
        <ToggleMenu
          menu={menu}
          click={clickNumber}
          onClick={handleToggleMenu}
        />
      </ToggleWrap>
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
    </Wrap>
  )
}

const Wrap = styled.div`
  height: 100%;
  background-color: var(--light-gray);
  padding-top: 116px;
`

const ToggleWrap = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 640px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 56px;
  background-color: var(--white);
  z-index: 5;
  & > div {
    padding-top: 13px;
    margin: 0;
  }
`

export default MyTranslationList
