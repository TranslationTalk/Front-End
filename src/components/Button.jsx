import styled from "styled-components";

const Button = (props) => {
  const {
    _onClick,
    content,
    margin,
    width,
    height,
    padding,
    color,
    bgc,
    border,
    longBtn,
    shortBtn
  } = props;

  const styles = {
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    color: color,
    bgc: bgc,
    border: border,
  };

  if(longBtn) {
      return (
          <>
            <LongButton onClick={_onClick}>{content}</LongButton>
          </>
      )
  }

  if(shortBtn) {
      return(
          <>
            <ShortButton onClick={_onClick}>{content}</ShortButton>
          </>
      )
  }

  return (
    <>
      <CustomButton {...styles} onClick={_onClick}>
        {content}
      </CustomButton>
    </>
  );
};

Button.defaultProps = {};

const CustomButton = styled.button`
  ${(props) => props.width ? `width: ${props.width}` : ''};
  ${(props) => props.height ? `height: ${props.height}` : ''};
  background-color: ${(props) => props.bgc};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border-radius: 36px;

  cursor: pointer;
  border: ${(props) => props.border};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const LongButton = styled.button`
    width: 200px;
    height: 50px;
`;

const ShortButton = styled.button`
    width: 100px;
    height: 50px;
`;

export default Button;
