import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CommentBox = ({ comment }) => {
  return (
    <Wrap>
      <p>{comment}</p>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  background-color: var(--light-blue);
  min-height: 100px;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: var(--fs-14);
  border: 1px solid var(--gray-c4);
`

CommentBox.propTypes = {
  comment: PropTypes.string,
}

export default CommentBox
