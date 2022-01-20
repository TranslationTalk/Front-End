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
      <form>
        <SelectInput
          name="field"
          value={requestForm.field}
          defaultOption="분류"
          options={fields}
          onChange={onChange}
        />
        <br />
        <TextInput
          name="deadline"
          value={requestForm.deadline}
          type="date"
          onChange={onChange}
        />
        <br />
        <SelectInput
          name="beforeLanguage"
          value={requestForm.beforeLanguage}
          defaultOption="번역 전"
          options={language}
          onChange={onChange}
        />
        &gt;
        <SelectInput
          name="afterLanguage"
          value={requestForm.afterLanguage}
          defaultOption="번역 후"
          options={language}
          onChange={onChange}
        />
        <br />
        <TextInput
          name="email"
          value={requestForm.email}
          placeholder="이메일"
          type="email"
          onChange={onChange}
        />
        <br />
        <TextInput
          name="phoneNumber"
          value={requestForm.phoneNumber}
          placeholder="전화번호"
          type="tel"
          onChange={onChange}
        />
        <br />
        {props.isText ? (
          <FileInput
            name="requestFile"
            value={requestForm.requestFile}
            onChange={onChange}
          />
        ) : (
          <TextInput
            name="youtubeUrl"
            value={requestForm.youtubeUrl}
            placeholder="youTube URL"
            onChange={onChange}
          />
        )}
        <br />
        <TextAreaInput
          name="needs"
          value={requestForm.needs}
          placeholder="세부 요청 사항"
          onChange={onChange}
        />
        <Button content="제출하기" _onClick={submit} />
      </form>
    </div>
  )
}

ClientRequestForm.propTypes = {
  isText: propTypes.bool,
}
export default ClientRequestForm
