/*
 번역 의뢰를 맞길 youtube 
 youtubeUrl: 보여줄 youtube의 url
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const VideoCard = ({ youtubeUrl }) => {
  return (
    <Card>
      <iframe
        width="560"
        height="315"
        src={youtubeUrl.replace('watch?v=', 'embed/')}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </Card>
  )
}

const Card = styled.div`
  width: 560px;
  margin: auto;
  & firame {
    width: 50%;
  }
`

VideoCard.propTypes = {
  youtubeUrl: PropTypes.string,
}

export default VideoCard
