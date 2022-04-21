import styled from "styled-components/native";

export const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  opacity: ${({visible}) => visible ? 0.1 : 1};
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  opacity: ${({visible}) => visible ? 0.5 : 1};
`;

export const CollectionBox = styled.TouchableOpacity`
  flex: 1;
  margin: 5px;
  align-items: center;
  justify-content: center;
  height: 130px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f7f7f7;
`;

export const InfoContainer = styled.View`
  align-items: flex-start;
  width: 85%;
`;
