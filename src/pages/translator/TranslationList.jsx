import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  EstimateCard,
  NavigationTranslator,
  PageHeader,
  Tag,
  TopDownButton,
} from '../../components'
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
    <>
      <PageHeader title="번역 리스트" useReloadButton />
      <Wrap>
        <FilterContainer>
          <Button content="언어선택" bgColor="#fff" color="#000" />
          <Tag text="영어" bgColor="#fff" color="#000" />
          <Tag text="한국어" bgColor="#fff" color="#000" />
        </FilterContainer>
        {/* 곧 마감되는 요청 없음??? */}
        {/* {estimates.slice(0, 2).map(estimate => (
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
        ))} */}
        {/* <h2>번역의뢰 리스트</h2> */}
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
        <TopDownButton />
        <NavigationTranslator />
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  padding-top: 56px;
  background-color: var(--light-gray);
`

const FilterContainer = styled.div`
  background-color: var(--white);
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  padding: 7px 20px;
  margin-bottom: 16px;
  button {
    font-size: var(--fs-14);
    font-weight: normal;
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 2px 8px;
    margin-right: 4px;
    transition: all 1s linear;
  }
  button:hover {
    background-color: var(--gray-c4);
  }
  & > div {
    padding: 6px 8px;
    font-size: var(--fs-14);
    border: 1px solid rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
`

export default TranslationList
