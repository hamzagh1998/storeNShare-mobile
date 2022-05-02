import styled from "styled-components/native";

export const MainContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CurrentItemContainer = styled.View`
  flex: 5;
  padding: 10px;
  background-color: ${({theme}) => theme.colors.bg.trinary};

`;

export const MiniViewContainer = styled.TouchableOpacity`
  flex: 1;
  width: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.bg.trinary};
`

export const Hr = styled.View`
  width: 95%;
  height: 1px;
  align-self: center;
  border: 1px solid ${({theme}) => theme.colors.ui.primary};
`;