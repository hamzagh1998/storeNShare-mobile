import styled from "styled-components/native";
import { Avatar } from "react-native-paper";

const TouchableOpacity = styled.TouchableOpacity`
  width: 50%;
`;

export const AddButton = styled.View`
  margin: 5px;
  min-height: 130px;
  align-items: center;
  justify-content: center;
  background-color: ${({bgColor1}) => bgColor1};
  border: 1px solid #707070;
  border-radius: 10px;
`;

export function AddBox({bgColor1, bgColor2, onPress}) {

  return (
    <TouchableOpacity onPress={onPress}>
      <AddButton bgColor1={bgColor1}>
        <Avatar.Icon size={80} icon="plus" backgroundColor={bgColor2} />
      </AddButton>
    </TouchableOpacity>
  )
}