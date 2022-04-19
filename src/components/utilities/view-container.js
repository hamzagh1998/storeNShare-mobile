import styled from "styled-components/native";

export const ViewContainer = styled.View`
  flex: 1;
  flex-direction: ${({direction}) => direction};
  align-items: ${({align}) => align};
  background-color: ${({theme}) => theme.colors.bg.primary};
  padding: ${({theme}) => theme.space[2]};
`;

ViewContainer.defaultProps = { direction: "column",align: "center" };