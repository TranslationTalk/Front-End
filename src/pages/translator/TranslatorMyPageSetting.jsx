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
import { useNavigate } from 'react-router-dom'
import { deleteFile, getDownloadUrl, uploadFile } from '../../utils/firebase'

const initialState = {
  name: '',
  career: '경력',
  profileUrl: '',
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
  const [selectInputs, setSelectInputs] = useState([0])
  const [languages, setLanguages] = useState({})

  const [file, setFile] = useState(null) // input으로 받아온 file
  const [fileName, setFileName] = useState('') // 백엔드에 보내고, storage에 업로드할 파일 이름
  const [preview, setPreview] = useState('') // image preview 요소
  const [prevFileUrl, setPrevFileUrl] = useState('') // 전에 사용하던 이미지 fileUrl

  const navigate = useNavigate()

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
        profileUrl,
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
        profileUrl,
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

    // 파일 업로드
    uploadFile(file, `profile/${fileName}`)
    // 기존 프로필 이미지 삭제
    deleteFile('profile', prevFileUrl)

    await apis.modifyTranslatorMypage(formData)
    setFormData(initialState)

    navigate('/translator/mypage')
  }

  const handleChange = e => {
    const { id, name, value, checked } = e.target
    setFormData({
      ...formData,
      [id === '' ? name : id]: name === '' ? checked : value,
    })
  }

  // fileChange시
  const handleFileChange = e => {
    // 업로드 하지는 않고 미리보기만
    const { files } = e.target
    setFile(files[0])
    setFileName(`${files[0].lastModified}_${files[0].name}`) // file name 지정
  }

  // fileName 변경되었을 때 formData.profileUrl fileName 넣기
  useEffect(() => {
    if (fileName === '') return
    // url로 만들어서 백엔드에 전달
    const profileUrl = getDownloadUrl('profile', fileName)
    setFormData({
      ...formData,
      profileUrl: profileUrl,
    })
  }, [fileName])

  // image preview
  useEffect(() => {
    setPreview(
      <img
        src={
          file
            ? URL.createObjectURL(file)
            : formData.profileUrl // 원래 가지고 있던 이미지 설정
            ? formData.profileUrl
            : defaultProfile
        }
        alt="profileImg"
        width="64px"
        height="64px"
      />,
    )

    // 이미지가 바뀔 때마다 이전 이미지가 바뀌면 안되니까 최초 url만 설정
    if (!file) {
      // 원래 가지고 있던 이미지 state로 저장
      setPrevFileUrl(formData.profileUrl)
    }

    return () => {}
  }, [file, formData.profileUrl])

  const handleSelectChange = e => {
    const { name, value } = e.target
    setLanguages({ ...languages, [name]: value })
  }

  const addSelectInput = () => {
    setSelectInputs(prev => [...prev, prev.length.toString()])
  }

  const removeSelectInput = index => {
    if (selectInputs.length === 1) return

    setSelectInputs(
      selectInputs.filter((el, idx) => idx !== index).map((el, index) => index),
    )

    if (Object.keys(languages).length === 1) return

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
      <HeaderWrap>
        <SubPageHeader
          title="계정 설정"
          useButton
          buttonLabel="저장"
          buttonEvent={handleSubmit}
        />
      </HeaderWrap>
      <ProfileWrap>
        {preview}
        <div>
          <FileInput
            onChange={handleFileChange}
            label="프로필 선택"
            fontSize="12px"
            padding="8px 10px"
            id="profileUrl"
            name="profileUrl"
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

const HeaderWrap = styled.div`
  & > div button {
    background-color: var(--white);
    color: var(--main-color);
    border: none;
    font-size: var(--fs-16);
  }
`

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
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    font-size: var(--fs-14);
    font-weight: normal;
    width: fit-content;
  }
  svg {
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
