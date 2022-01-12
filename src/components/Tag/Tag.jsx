import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = ({text, textColor, backgroundColor}) => {
  // 태그 컴포넌트
  // 태그 내용: text
  // 태그 글자 색: textColor
  // 태그 배경 색: backgroundColor

  const TagBox = styled.div`
    display: inline-block;
    padding: 5px 10px;
    border-radius: 15px;
    margin-right:5px;
    background: ${backgroundColor};
    & p {
      color: ${textColor}
    }
  `

  return (
    <TagBox>
      <p>
        {text}
      </p>
    </TagBox>
  );
};

Tag.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default Tag;