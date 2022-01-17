// ClientHome
// text, 영상 번역요청 고르는 페이지

import React from 'react'
import { Link } from 'react-router-dom'
import { NavigationUser, PageHeader } from '../../components'
import Button from '../../components/button/Button'

const ClientHome = () => {
  return (
    <>
      <PageHeader />
      <Link to={'/client/request/text'}>
        <Button content="text번역" />
      </Link>
      <Link to={'/client/request/youtube'}>
        <Button content="영상 번역" />
      </Link>
      <NavigationUser />
    </>
  )
}

export default ClientHome
