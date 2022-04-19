import styled from "styled-components/native";
import { Button as paperButton} from "react-native-paper";

const sizesVariant = {
  small: 0,
  medium: 1,
  large: 2,
  xl: 3,
  xxl: 4
}

export const Button = styled(paperButton)`
  background-color: ${({bgColor, theme}) => theme.colors.bgButton[bgColor]};
  padding: ${({size, theme}) => theme.sizes[sizesVariant[size]]};
  width: ${({width}) => width};
`;

Button.defaultProps = { bgColor: "primary", size: "medium", width: "100%"};