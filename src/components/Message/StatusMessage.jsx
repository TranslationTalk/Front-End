import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatusMessage = ({text, color, icon}) => {
  // 상태 메시지
  // 메시지: text
  // 메시지 color: color
  // 아이콘 : icon

  const StatusMsg = styled.div`
    color: ${color};
    & i{
      display: inline-block;
      width: 20px;
      border-radius: 50%;
      padding: 2px 7px;
      margin-right: 5px;
      background: ${color};
      color: #fff;
      text-align: center;
      font-weight: bold;
    }
  `

  return (
    <StatusMsg>
      <i>{icon}</i>
      <span>{text}</span>
    </StatusMsg>
  );
};

StatusMessage.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string
};

export default StatusMessage;