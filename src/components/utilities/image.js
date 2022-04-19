import styled from "styled-components/native";

export const Image = styled.Image`
  height: ${({height}) => height}px;
  width: ${({width}) => width}px;
`; 

Image.defaultProps = { height: 120, width: 120 };