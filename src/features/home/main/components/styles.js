import styled from "styled-components/native";

export const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  opacity: ${({visible}) => visible ? 0.1 : 1};
`;

export const RowContainer = styled.View`
  /* flex: 1; */
  flex-direction: row;
`;

export const CollectionBox = styled.TouchableOpacity`
  margin: 5px;
  align-items: center;
  width: 48%;
  justify-content: center;
  height: 130px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.bg.trinary};
`;

export const InfoContainer = styled.View`
  align-items: flex-start;
  width: 85%;
`;

export const Centralizer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RectangularContainer = styled.View`
flex-direction: row;
padding: 10px;
align-items: center;
width: 100%;
border: 1px solid #ddd;
border-radius: 10px;
background-color: ${({theme}) => theme.colors.bg.trinary};
`; 

export const VerLine = styled.View`
width: 1px;
height: 80%;
border: 1px solid #ddd;
`;

export const Container = styled.View`
flex: 1;
width: 100%;
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