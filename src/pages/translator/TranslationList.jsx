import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  CheckBoxInput,
  EstimateCard,
  FilterMenu,
  NavigationTranslator,
  NoList,
  PageHeader,
  Spinner,
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
  const [loading, setLoading] = useState(false)

  const fetchEstimatesAndFiltering = async () => {
    const {
      data: { data },
    } = await apis.estimatesList()

    setEstimates(data)

    // 내 정보에서 가능 언어 가져옴
    const {
      data: { data: myInfo },
    } = await apis.getTranslatorMypage()

    // 가능언어를 필터 초기 세팅으로 두고, 화면에도 필터링된 결과를 보여줌
    const languagesArr = myInfo.language.split(', ')
    setCapableLanguages(languagesArr)
    setFilteredEstimates(
      data.filter(
        el =>
          languagesArr.includes(el.beforeLanguage) ||
          languagesArr.includes(el.afterLanguage),
      ),
    )

    // 데이터 가져온 상태이므로 loading 상태 false 전환
    setLoading(false)
  }
  // mobx에서 mobx에 있는 함수를 사용해서 비동기 처리해야함
  // 그 함수로 useEffect 안에도 넣고, PageHeader의 reloadEvent에도 넣어야 한다.
  useEffect(() => {
    setLoading(true) // 아직 데이터 가져오지 않은 상태
    fetchEstimatesAndFiltering()
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
    setShowModal(prev => !prev)
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
      <PageHeader
        title="번역 리스트"
        useReloadButton
        reloadEvent={fetchEstimatesAndFiltering}
      />
      <FilterMenu
        showModal={showModal}
        openModal={openModal}
        capableLanguages={capableLanguages}
      />
      <Wrap>
        {filterdEstimates.length === 0 ? (
          loading ? (
            <Spinner loadingTitle="번역 의뢰 가져오는 중" />
          ) : (
            <NoList listName='아직 받은 "번역 의뢰"가 없어요' />
          )
        ) : (
          filterdEstimates.map(estimate => (
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
          ))
        )}
        <TopDownButton />
        <NavigationTranslator />
        <ModalBackground showModal={showModal} />
      </Wrap>
      <Modal showModal={showModal}>
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
      </Modal>
    </>
  )
}

const Wrap = styled.div`
  height: 100%;
  background-color: var(--light-gray);
  padding-top: 115px;
  position: relative;
  min-height: 100vh;
`

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 360px;
  max-width: 640px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${props => (props.showModal ? '1' : '0')};
  transition: opacity 0.3s ease-in;
  pointer-events: ${props => (props.showModal ? 'unset' : 'none')};
`

const Modal = styled.div`
  position: fixed;
  top: 103px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 360px;
  max-width: 640px;
  background-color: var(--white);
  width: 100%;
  padding: 0 20px 50px;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.3);
  z-index: 1;
  height: ${props => (props.showModal ? '60%' : '0')};
  opacity: ${props => (props.showModal ? '1' : '0')};
  max-height: ${props => (props.showModal ? '400px' : '0')};
  transition: all 0.5s ease-in;
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
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: rgba(61, 80, 255, 0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--white);
  }
`

const CheckBoxWrap = styled.div`
  position: relative;
  div {
    padding: 8px 12px;
    background-color: ${props => (props.checked ? '#EDF2FF' : 'none')};
    color: ${props => (props.checked ? '#3D51FF' : '#000')};
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
