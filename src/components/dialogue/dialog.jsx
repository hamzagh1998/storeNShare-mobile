import React, { useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';

import { Spacer } from "../spacer/spacer";
import { Text } from "../utilities";

const DialogConatiner = styled.View`
  flex: 1;
  position: absolute;
  top: 30%;
  padding: 10px;
  height: 250px;
  width: 95%;
  align-self: center;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
`;

const Hr = styled.View`
  /* flex-direction: row; */
  width: 100%;
  height: 0px;
  border: 1px solid #000;
`;

const HorizontalView = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;

const CloseConatiner = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
`;

const TextContainer = styled.View`
  flex: 4;
`;

const ButtonsConatiner = styled.View`
  flex: 1;
`;

export function Dialog({ visible = false, onClose, title, content, bottons }) {

  return (
    <>
      {
        visible
        && <DialogConatiner>
          <TextContainer>
            <Text variant="cover">{title}</Text>
            <CloseConatiner onPress={() => onClose(false)}>
              <AntDesign name="closecircle" size={24} color="black" />
            </CloseConatiner>
            <Hr />
            <Spacer variant="large" />
            <Text>{content}</Text>
          </TextContainer>
          <ButtonsConatiner>
            <HorizontalView>
              {bottons.map(button => button)}
            </HorizontalView>
          </ButtonsConatiner>
        </DialogConatiner>
      }
    </>
  );
};