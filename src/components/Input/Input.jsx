import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ text }) => {
  return <div style={{ left: '20px' }}>{text}Component</div>
}

Input.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Input
