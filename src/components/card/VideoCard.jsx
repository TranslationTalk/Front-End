/*
 번역 의뢰를 맞길 youtube 
 youtubeUrl: 보여줄 youtube의 url
*/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const VideoCard = ({ youtubeUrl }) => {
  const [videoWidth, setVideoWidth] = useState(window.innerWidth)
  window.onresize = () => {
    setVideoWidth(window.innerWidth)
  }
  return (
    <Card>
      <iframe
        width={videoWidth}
        height="315"
        src={youtubeUrl.split('&')[0].replace('watch?v=', 'embed/')}
      ></iframe>
    </Card>
  )
}

const Card = styled.div`
  position: relative;
  margin: auto;
  iframe {
    max-width: 640px;
  }
`

VideoCard.propTypes = {
  youtubeUrl: PropTypes.string,
}

export default VideoCard
