/*
알림 모달창
title: 모달창 제목 
text: 모달창 내용
showModal, setShowModal: bool타입, treu-> 모달창 열림
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '..'

const AlertModal = ({ title, text, showModal, setShowModal }) => {
  return (
    <Modal showModal={showModal}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <Button
          content="확인"
          onClick={() => {
            setShowModal(false)
          }}
        />
      </div>
    </Modal>
  )
}

const Modal = styled.div`
  display: ${prop => (prop.showModal ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  > div {
    width: 320px;
    border-radius: 12px;
    padding: 29px 36px 18px;
    margin: 35vh auto;
    box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    line-height: 1.4;
    > h2 {
      margin-top: 0;
      margin-bottom: 10px;
      color: var(--orange-red);
      font-size: 16px;
      font-weight: bold;
    }
    > p {
      margin-bottom: 23px;
      text-align: center;
    }
    > button {
      display: block;
      width: 99px;
      height: 38px;
      padding: 0;
      margin: auto;
      font-size: 18px;
    }
  }
`

AlertModal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
}

export default AlertModal
