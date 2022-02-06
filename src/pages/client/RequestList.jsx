/*
  Client 
  견적요청 form -> 견적요청List* -> 받은 견적List -> 번역가 상세페이지
  견적요청List 페이지
*/
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  EstimateCard,
  NavigationUser,
  NoList,
  PageHeader,
  Spinner,
  ToggleMenu,
  TopDownButton,
} from '../../components'
import { clientAPIs } from '../../utils/axios'

const menu = ['견적대기', '진행중', '완료']

const RequestList = () => {
  const navigate = useNavigate()
  const [estimates, setEstimates] = useState([])
  const [clickNumber, setClickNumber] = useState(0)
  const [estimatesState, setEstimatesState] = useState('ready')
  const [loading, setLoading] = useState(false)

  // 비동기 처리
  useEffect(() => {
    setLoading(true)
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await clientAPIs.requestList()
      setEstimates(data)
      setLoading(false)
    }
    fetchEstimateList()
  }, [])

  // card클릭 시 받은 견적 list로 이동
  // 요청id state로 넘김
  const cardClick = estimate => {
    if (estimate.status === 'ready') {
      navigate('/client/estimate/list', {
        state: { requestId: estimate.id, createdTime: estimate.createdAt },
      })
    } else {
      navigate('/client/estimate/detail/', {
        state: { requestId: estimate.id, estimateId: estimate.estimateId },
      })
    }
  }

  // 토글 메뉴 선택된 넘버 set
  const handleToggleMenu = number => {
    switch (number) {
      case 0:
        setEstimatesState('ready')
        break
      case 1:
        setEstimatesState('processing')
        break
      case 2:
        setEstimatesState('done')
        break
      default:
        setEstimates('ready')
    }
    setClickNumber(number)
  }

  return (
    <RequestListPage>
      <PageHeader title="번역 의뢰 리스트" useReloadButton />
      <ToggleMenu menu={menu} click={clickNumber} onClick={handleToggleMenu} />
      <ul>
        {estimates.filter(el => el.status === estimatesState).length === 0 ? (
          <NoList
            listName={'아직 "' + menu[clickNumber] + '" 리스트가 없어요'}
          />
        ) : (
          estimates
            .filter(el => el.status === estimatesState)
            .map(estimate => {
              return (
                <EstimateCard
                  key={estimate.id}
                  userName={estimate.clientId.toString()}
                  field={estimate.field}
                  beforeLanguage={estimate.beforeLanguage}
                  afterLanguage={estimate.afterLanguage}
                  isText={estimate.isText}
                  deadline={estimate.deadline}
                  createdTime={estimate.createdAt}
                  onClick={() => cardClick(estimate)}
                />
              )
            })
        )}
        {loading && <Spinner loadingTitle="내 번역요청 가져오는 중" />}
      </ul>
      <NavigationUser />
      <TopDownButton />
    </RequestListPage>
  )
}

const RequestListPage = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 56px 0 72px;
  background-color: var(--light-gray);
  ul {
    display: flex;
    flex-direction: column-reverse;
    margin: 20px 0;
  }
`

export default RequestList
