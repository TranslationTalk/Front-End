import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Tag } from '..'
import { ReactComponent as ArrowDown } from '../../assets/icons/ArrowDown.svg'
import { ReactComponent as ArrowUp } from '../../assets/icons/ArrowUpBlue.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

const FilterMenu = ({ showModal, openModal, capableLanguages }) => {
  return (
    <FilterContainer clicked={showModal}>
      <Swiper
        slidesPerView={'auto'} // 태그마다 width 다르게
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        centeredSlides={false} // center 정렬 사용 X
        className="mySwiper"
      >
        <SwiperSlide>
          <button onClick={openModal}>
            <span>언어 선택</span>
            {showModal ? <ArrowUp /> : <ArrowDown />}
          </button>
        </SwiperSlide>
        {capableLanguages.map(language => (
          <SwiperSlide key={language}>
            <Tag text={language} bgColor="#fff" color="#000" />
          </SwiperSlide>
        ))}
      </Swiper>
    </FilterContainer>
  )
}

const FilterContainer = styled.div`
  background-color: var(--white);
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  min-width: 360px;
  max-width: 640px;
  padding: 7px 0;
  button {
    background-color: var(--white);
    font-size: var(--fs-14);
    font-weight: normal;
    color: ${props => (props.clicked ? '#3D51FF' : '#000')};
    width: fit-content;
    height: fit-content;
    border-radius: 15px;
    padding: 3px 6px;
    margin-left: 20px;
    border: 1px solid ${props => (props.clicked ? '#3D51FF' : '#c4c4c4')};
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
  .swiper-slide {
    width: fit-content;
    margin: auto 0;
    cursor: default;
    & > div {
      border: 1px solid #c4c4c4;
    }
  }
`

FilterMenu.propTypes = {
  showModal: PropTypes.bool,
  openModal: PropTypes.func,
  capableLanguages: PropTypes.array,
}

export default FilterMenu
