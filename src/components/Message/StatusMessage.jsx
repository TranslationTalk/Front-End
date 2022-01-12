import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatusMessage = ({text,color, icon}) => {
  // 상태 메시지
  // 메시지: text
  // 메시지 color: color
  // 아이콘 : icon


  return (
    <StatusMsg color={color}>
      <i>{icon}</i>
      <span>{text}</span>
    </StatusMsg>
  );
};

const StatusMsg = styled.div`
color: ${props=>props.color};
& i{
  display: inline-block;
  width: 20px;
  border-radius: 50%;
  padding: 2px 7px;
  margin-right: 5px;
  background: ${props=>props.color};
  color: #fff;
  text-align: center;
  font-weight: bold;
}
`
StatusMsg.propTypes={
}

StatusMessage.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string
};

export default StatusMessage;