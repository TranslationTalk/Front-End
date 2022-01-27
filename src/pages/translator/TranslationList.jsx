import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  // Button,
  CheckBoxInput,
  EstimateCard,
  NavigationTranslator,
  NoList,
  PageHeader,
  Tag,
  TopDownButton,
} from '../../components'
import { apis } from '../../utils/axios'
import { language as languages } from '../../constant/selectOptions'
import { ReactComponent as CloseBtn } from '../../assets/icons/Close.svg'
import { ReactComponent as CheckedIcon } from '../../assets/icons/Check.svg'
import { ReactComponent as ArrowDown } from '../../assets/icons/ArrowDown.svg'
import { ReactComponent as ArrowUp } from '../../assets/icons/ArrowUpBlue.svg'

const TranslationList = () => {
  const [estimates, setEstimates] = useState([])
  const [filterdEstimates, setFilteredEstimates] = useState([])
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [capableLanguages, setCapableLanguages] = useState([])
  const [height, setHeight] = useState(0)

  const fetchEstimatesAndFiltering = async () => {
    const {
      data: { data },
    } = await apis.estimatesList() // sendEstimate이것으로 바꿔야 하나 지금 프로필을 만들 수 없어 임시로 client 요청하는 중

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
  }
  // mobx에서 mobx에 있는 함수를 사용해서 비동기 처리해야함
  // 그 함수로 useEffect 안에도 넣고, PageHeader의 reloadEvent에도 넣어야 한다.
  useEffect(() => {
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

  const callbackRef = element => {
    if (element) {
      setHeight(element.getBoundingClientRect().height)
    }
  }

  return (
    <>
      <PageHeader
        title="번역 리스트"
        useReloadButton
        reloadEvent={fetchEstimatesAndFiltering}
      />
      <FilterContainer clicked={showModal} ref={callbackRef}>
        <button onClick={openModal}>
          <span>언어 선택</span>
          {showModal ? <ArrowUp /> : <ArrowDown />}
        </button>
        {capableLanguages.map(language => (
          <Tag key={language} text={language} bgColor="#fff" color="#000" />
        ))}
      </FilterContainer>
      <Wrap paddingTop={height}>
        {filterdEstimates.length === 0 ? (
          <NoList listName="번역 의뢰" />
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

const FilterContainer = styled.div`
  background-color: var(--white);
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 7px 20px;
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  min-width: 360px;
  max-width: 640px;
  button {
    background-color: var(--white);
    font-size: var(--fs-14);
    font-weight: normal;
    color: ${props => (props.clicked ? '#3D51FF' : '#000')};
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 3px 6px;
    border: 1px solid
      ${props => (props.clicked ? '#3D51FF' : 'rgba(0, 0, 0, 0.3)')};
    margin-right: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s linear;
    cursor: pointer;
  }
  button:hover {
    color: var(--main-color);
    border: 1px solid var(--main-color);
  }
  & > div {
    padding: 6px 8px;
    font-size: var(--fs-14);
    border: 1px solid rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
`

const Wrap = styled.div`
  height: 100%;
  background-color: var(--light-gray);
  padding: ${props => props.paddingTop + 56}px 0 78px 0;
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
