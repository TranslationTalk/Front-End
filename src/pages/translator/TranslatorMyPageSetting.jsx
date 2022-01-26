import React, { useState, useEffect } from 'react'
import {
  TextInput,
  SelectInput,
  CheckBoxInput,
  Button,
  StatusMessage,
  TextAreaInput,
  SubPageHeader,
  FileInput,
} from '../../components/index'
import { apis } from '../../utils/axios'
import defaultProfile from '../../assets/images/TranslatorProfile.png'
import { language } from '../../constant/selectOptions'
import styled from 'styled-components'
import { ReactComponent as AddIcon } from '../../assets/icons/Add.svg'

const initialState = {
  name: '',
  profileFile: '',
  language: '',
  email: '',
  phoneNum: '',
  introduce: '',
  taxPossible: false,
  cashPossible: false,
  isBusiness: false,
}

// translatorSignupForm 이랑 거의 같아서
// template 화 시키면 좋을 것 같다.

const TranslatorMyPageSetting = () => {
  const [formData, setFormData] = useState(initialState)
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState('')
  const [selectInputs, setSelectInputs] = useState([0])
  const [languages, setLanguages] = useState({})

  useEffect(() => {
    const fetchMyInformation = async () => {
      const {
        data: { data: infoData },
      } = await apis.getTranslatorMypage()
      const {
        name,
        language,
        introduce,
        cashPossible,
        isBusiness,
        taxPossible,
      } = infoData

      // 원래 갖고 있던 데이터를 form에 넣어줌
      setFormData(prev => ({
        ...prev,
        name,
        language,
        introduce,
        cashPossible,
        isBusiness,
        taxPossible,
      }))

      // 가능언어 원래 가지고 있던 데이터로 설정
      const languages = language.split(', ')
      const initialSelectInputs = new Array(languages.length)
        .fill(0)
        .map((el, index) => index.toString())
      setSelectInputs(initialSelectInputs)
      const initialLanguages = Object.fromEntries(
        languages.map((el, index) => [index.toString(), el]),
      )
      setLanguages(initialLanguages)
    }
    fetchMyInformation()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(formData)

    const {
      data: { data },
    } = await apis.modifyTranslatorMypage(formData)
    console.log(data)
    setFormData(initialState)
  }

  const handleChange = e => {
    const { id, name, value, checked, files } = e.target
    console.log(id, name, value)
    setFormData({
      ...formData,
      [id === '' ? name : id]: name === '' ? checked : value,
    })

    if (id === 'profileFile') {
      console.log(id, value.slice(12))
      console.log(files)
      setFileImage(URL.createObjectURL(files[0]))
      console.log(fileImage)
    }
  }

  const handleSelectChange = e => {
    const { name, value } = e.target
    setLanguages({ ...languages, [name]: value })
  }

  const addSelectInput = () => {
    setSelectInputs(prev => [...prev, prev.length.toString()])
  }

  const removeSelectInput = index => {
    if (selectInputs.length === 1) return // 기본 한 개는 가지고 있어야 하므로

    // 가능 언어 추가했다가 아직 선택 안했을 경우에도 삭제가 되어야 하므로
    // languages object 길이 early return 보다 먼저 해준다.

    setSelectInputs(
      selectInputs.filter((el, idx) => idx !== index).map((el, index) => index),
    )

    if (Object.keys(languages).length === 1) return

    // 그냥 바로 수정 하면 당연히 안될 듯 그래서 복제함
    const tempLanguages = { ...languages }
    delete tempLanguages[index]
    const entries = Object.entries(tempLanguages).map(([, lang], index) => [
      index.toString(),
      lang,
    ])
    setLanguages(Object.fromEntries(entries))
  }

  useEffect(() => {
    const language = Object.values(languages).join(', ')
    setFormData({ ...formData, language })
  }, [languages])

  return (
    <>
      <SubPageHeader title="계정 설정" />
      <ProfileWrap>
        <img
          src={fileImage ? fileImage : defaultProfile}
          alt="profileImg"
          width="64px"
          height="64px"
        />
        <div>
          <FileInput
            onChange={handleChange}
            label="프로필 선택"
            fontSize="12px"
            padding="8px 10px"
            id="profileFile"
            name="profileFile"
            accept="image"
          />
        </div>
      </ProfileWrap>
      <Form onSubmit={handleSubmit}>
        <Name>
          <span>이름</span>
          <span>{formData.name ?? ''}</span>
        </Name>
        <TextInput
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        <TextInput
          name="phoneNum"
          type="phone"
          placeholder="전화번호"
          onChange={handleChange}
        />
        {selectInputs.map((select, index) => (
          <SelectContainer key={select}>
            <SelectInput
              id="language"
              name={select.toString()}
              value={languages[index]}
              onChange={handleSelectChange}
              defaultOption="가능언어"
              options={language}
            />
            {index ? (
              <Button
                type="button"
                content="삭제"
                onClick={() => removeSelectInput(index)}
                border
              />
            ) : null}
          </SelectContainer>
        ))}
        <ButtonWrap>
          <Button
            type="button"
            content="가능언어 추가"
            onClick={addSelectInput}
            bgColor="#fff"
            color="#3D51FF"
          />
          <AddIcon />
        </ButtonWrap>
        <TextAreaInput
          name="introduce"
          placeholder="자기소개"
          onChange={handleChange}
          value={formData.introduce}
        />
        <CheckboxWrap>
          <StatusMessage
            icon="info"
            text="번역톡은 번역 및 결제를 책임지지 않습니다."
            color="#FF5F5F"
          />
          <CheckBoxInput
            id="taxPossible"
            label="세금명세서 가능 여부"
            onChange={handleChange}
            checked={formData.taxPossible}
          />
          <CheckBoxInput
            id="cashPossible"
            label="현금영수증 가능 여부"
            onChange={handleChange}
            checked={formData.cashPossible}
          />
          <CheckBoxInput
            id="isBusiness"
            label="사업자 여부"
            onChange={handleChange}
            checked={formData.isBusiness}
          />
        </CheckboxWrap>
        <Button type="submit" content="저장하기" />
      </Form>
    </>
  )
}

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
  margin-bottom: 21px;
  padding: 24px;
  padding-bottom: 16px;
  & > img {
    margin-bottom: 15px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  }
  & > div {
    width: 78px;
    height: 25px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  padding-bottom: 20px;
  & > button {
    width: fit-content;
    height: fit-content;
    font-size: var(--fs-18);
    font-weight: bold;
    padding: 11px 33px;
    margin: auto;
  }
`

const Name = styled.div`
  padding: 11px 12px;
  font-size: var(--fs-14);
  span:first-child {
    margin-right: 70px;
  }
`

const SelectContainer = styled.div`
  display: flex;
  gap: 8px;
  button {
    max-width: 63px;
    font-size: var(--fs-14);
    font-weight: normal;
  }
`

const ButtonWrap = styled.div`
  margin-top: 0;
  position: relative;
  & > button {
    font-size: var(--fs-14);
    font-weight: normal;
  }
  svg {
    position: absolute;
    top: 12px;
    right: 35%;
    pointer-events: none;
  }
`

const CheckboxWrap = styled.div`
  margin-top: 8px;
  & > div {
    margin-bottom: 4px;
  }
  & > div:first-child {
    margin-bottom: 12px;
  }
`

export default TranslatorMyPageSetting
