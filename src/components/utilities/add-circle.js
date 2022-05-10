import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

export const AddBtnContainer = styled.View`
  background-color: ${({bgColor1}) => bgColor1};
  border: 1px solid ${({bgColor1}) => bgColor1};
  border-radius: 50px;
  position: absolute;
  top: 85%;
  right: 5%;
`;

export function AddCircle({bgColor1, bgColor2, onPress}) {

  return (
    <AddBtnContainer bgColor1={bgColor1}>
      <TouchableOpacity onPress={onPress}>
        <Avatar.Icon size={65} icon="plus" backgroundColor={bgColor2} />
      </TouchableOpacity>
    </AddBtnContainer>
  );
};

