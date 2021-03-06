import styled from "styled-components/native";

export const Image = styled.Image`
  height: ${({height}) => height}px;
  width: ${({width}) => width}px;
  border-radius: ${({rounded}) => rounded ? 50 : 0};
`; 

Image.defaultProps = { height: 100, width: 100, rounded: false };