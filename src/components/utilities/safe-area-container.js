import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg.primary};
  margin-top: ${StatusBar.currentHeight}px;
`;