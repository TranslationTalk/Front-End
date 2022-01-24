import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  CheckBoxInput,
  EstimateCard,
  NavigationTranslator,
  PageHeader,
  Tag,
  TopDownButton,
} from '../../components'
import { apis } from '../../utils/axios'
import { language as languages } from '../../constant/selectOptions'
import { ReactComponent as CloseBtn } from '../../assets/icons/Close.svg'
import { ReactComponent as CheckedIcon } from '../../assets/icons/Check.svg'

const TranslationList = () => {
  const [estimates, setEstimates] = useState([])
  const [filterdEstimates, setFilteredEstimates] = useState([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [capableLanguages, setCapableLanguages] = useState([])

  // mobx에서 mobx에 있는 함수를 사용해서 비동기 처리해야함
  // 그 함수로 useEffect 안에도 넣고, PageHeader의 reloadEvent에도 넣어야 한다.
  useEffect(() => {
    const fetchEstimateList = async () => {
      const {
        data: { data },
      } = await apis.estimatesList() // sendEstimate이것으로 바꿔야 하나 지금 프로필을 만들 수 없어 임시로 client 요청하는 중
      console.log(data)
      setEstimates(data)
      setFilteredEstimates(data)
    }
    fetchEstimateList()
    // 필터 초기화
    setCapableLanguages([]) // 지금은 아예 초기화지만, 데이터(가능 언어) 받아와서 넣어주어야 한다.
    setFilteredEstimates([])
  }, [])

  const handleClick = estimate => {
    navigate('/translator/estimate/form', {
      state: {
        estimate,
      },
    })
  }

  const handleChangeLanguages = e => {
    const { value, checked } = e.target

    // check가 된거면 배열에 추가하고, 아니면 배열에서 지운다
    setCapableLanguages(prev =>
      checked ? [...prev, value] : prev.filter(el => el !== value),
    )
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    console.log(capableLanguages)
    setShowModal(false)
  }

  useEffect(() => {
    // 선택된 것 없으면 원래 있던 것 다 보여주고 filter 못하도록 return
    if (!capableLanguages.length) {
      setFilteredEstimates(estimates)
      return
    }

    setFilteredEstimates(
      estimates.filter(
        el =>
          capableLanguages.includes(el.beforeLanguage) ||
          capableLanguages.includes(el.afterLanguage),
      ),
    )
  }, [capableLanguages])

  return (
    <>
      <PageHeader title="번역 리스트" useReloadButton />
      <Wrap>
        <FilterContainer>
          <Button
            content="언어선택"
            bgColor="#fff"
            color="#000"
            onClick={openModal}
          />
          {capableLanguages.map(language => (
            <Tag key={language} text={language} bgColor="#fff" color="#000" />
          ))}
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
        {filterdEstimates.map(estimate => (
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
      {showModal && (
        <Modal>
          <ModalContent>
            <Title>
              <h3>언어 선택</h3>
              <CloseBtn onClick={closeModal} />
            </Title>
            <Content>
              {languages.map(language => (
                <CheckBoxWrap
                  key={language}
                  checked={capableLanguages.includes(language)}
                >
                  <CheckBoxInput
                    name="capableLanguages"
                    id={language}
                    onChange={handleChangeLanguages}
                    label={language}
                    checked={capableLanguages.includes(language)}
                  />
                  <span>
                    {capableLanguages.includes(language) && <CheckedIcon />}
                  </span>
                </CheckBoxWrap>
              ))}
            </Content>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

const Wrap = styled.div`
  height: 100%;
  background-color: var(--light-gray);
  padding: 56px 0 16px 0;
  position: relative;
  min-height: 100vh;
`

const FilterContainer = styled.div`
  background-color: var(--white);
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
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
    transition: all 0.3s linear;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  min-width: 360px;
  max-width: 640px;
  z-index: 5;
`

const ModalContent = styled.div`
  background-color: var(--white);
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 20px;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.3);
`

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  padding: 10px 20px;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  h3 {
    font-size: var(--fs-16);
    font-weight: 500;
  }
`

const Content = styled.div`
  margin-top: 36px;
  height: 100%;
  overflow-y: auto;
`

const CheckBoxWrap = styled.div`
  position: relative;
  div {
    padding: 8px 12px;
    border: ${props => (props.checked ? '1px solid #3D51FF' : 'none')};
    border-radius: 12px;
    margin-bottom: 4px;
    & > input {
      display: none;
    }
  }
  span {
    position: absolute;
    right: 12px;
    top: 8px;
  }
`

export default TranslationList
