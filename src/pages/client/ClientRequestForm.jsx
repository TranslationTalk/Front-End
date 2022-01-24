/*
  견적요청 페이지
*/

import React, { useState } from 'react'
import {
  Button,
  FileInput,
  SubPageHeader,
  TextAreaInput,
  TextInput,
} from '../../components'
import SelectInput from '../../components/input/SelectInput'
import propTypes from 'prop-types'
import { fields, language } from '../../constant/selectOptions'
import { clientAPIs } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ClientRequestForm = props => {
  const navigate = useNavigate()
  const [requestForm, setRequestForm] = useState({
    field: '',
    deadline: '',
    beforeLanguage: '',
    afterLanguage: '',
    email: '',
    phoneNumber: '',
    youtubeUrl: '',
    requestFile: '',
    isText: props.isText,
    needs: '',
  })

  const onChange = e => {
    const { value, name } = e.target
    setRequestForm({ ...requestForm, [name]: value })
  }

  const submit = () => {
    // 제출 후 RequestList페이지로 이동
    const {
      field,
      deadline,
      beforeLanguage,
      afterLanguage,
      email,
      phoneNumber,
      youtubeUrl,
      requestFile,
      isText,
      needs,
    } = requestForm
    clientAPIs
      .estimateRequest(
        field,
        deadline,
        beforeLanguage,
        afterLanguage,
        email,
        phoneNumber,
        youtubeUrl,
        requestFile,
        isText,
        needs,
      )
      .then(() => {
        alert(`요청 완료`)
        navigate('/client/request/list')
      })
      .catch(e => alert(`${e} already exist id '${requestForm}`))
  }

  return (
    <div>
      <SubPageHeader title="번역 요청 Form" />
      <Form>
        <p>번역 요청 의뢰서</p>
        <SelectInput
          name="field"
          value={requestForm.field}
          defaultOption="분류"
          options={fields}
          onChange={onChange}
        />
        <TextInput
          name="deadline"
          value={requestForm.deadline}
          type="date"
          onChange={onChange}
        />
        <div>
          <SelectInput
            name="beforeLanguage"
            value={requestForm.beforeLanguage}
            defaultOption="번역 전"
            options={language}
            onChange={onChange}
          />
          <SelectInput
            name="afterLanguage"
            value={requestForm.afterLanguage}
            defaultOption="번역 후"
            options={language}
            onChange={onChange}
          />
        </div>
        <TextInput
          name="email"
          value={requestForm.email}
          placeholder="이메일"
          type="email"
          onChange={onChange}
        />
        <TextInput
          name="phoneNumber"
          value={requestForm.phoneNumber}
          placeholder="전화번호"
          type="tel"
          onChange={onChange}
        />
        {props.isText ? (
          <FileInput
            label="파일 올리기(.txt)"
            value={requestForm.requestFile}
            useUploadName
            onChange={onChange}
            id="input"
            accept="text"
          />
        ) : (
          <TextInput
            name="youtubeUrl"
            value={requestForm.youtubeUrl}
            placeholder="youTube URL"
            onChange={onChange}
          />
        )}
        <TextAreaInput
          name="needs"
          value={requestForm.needs}
          placeholder="세부 요청 사항"
          onChange={onChange}
        />
        <Button content="요청하기" onClick={submit} type="button" />
      </Form>
    </div>
  )
}

const Form = styled.form`
  margin: 90px 20px 0;
  p {
    margin-bottom: 27px;
    font-size: var(--fs-18);
    font-weight: 500;
  }
  > select,
  > input,
  > textarea,
  > div {
    margin: 4px 0;
  }

  > button {
    display: block;
    width: 150px;
    margin: auto;
    margin-top: 20px;
  }
  > div {
    display: flex;
    select:first-child {
      margin-right: 8px;
    }
  }
`

ClientRequestForm.propTypes = {
  isText: propTypes.bool,
}
export default ClientRequestForm
