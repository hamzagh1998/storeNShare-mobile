import React from "react";
import styled from "styled-components/native";
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { Spacer } from "../spacer/spacer";
import { Text } from "../utilities";

const PopUpConatiner = styled.View`
  flex: 1;
  position: absolute;
  top: 20%;
  padding: 10px;
  height: ${({height}) => height};
  width: 95%;
  align-self: center;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
`;

const Hr = styled.View`
  width: 100%;
  height: 0px;
  border: 1px solid #000;
`;

const CloseConatiner = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
`;

const ContetContainer = styled.View`
  flex: 6;
`;

const ButtonsConatiner = styled.View`
  flex: 1;
`;

export function PopUp(
    { icon, title, visible=false, height="80%", onClose, btnText, content=null, action }
  ) {

  return (
    <>
      {
        visible
        && <PopUpConatiner height={height}>
            <ContetContainer>
              <Text variant="cover">{title}</Text>
              <CloseConatiner onPress={() => onClose(false)}>
                <AntDesign name="closecircle" size={24} color="black" />
              </CloseConatiner>
              <Hr />
              <Spacer variant="large" />
              { content }
            </ContetContainer>
            <Spacer variant="large" />
            <ButtonsConatiner>
              <Button mode="text" icon={icon} onPress={action}>{ btnText }</Button>
            </ButtonsConatiner>
        </PopUpConatiner>
      }
    </>
  );
};