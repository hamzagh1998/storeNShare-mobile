import React from "react";
import styled, { useTheme } from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";

const sizesVar = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export function LoadingIndicator({size="medium", color}) {
  const {colors, sizes} = useTheme();
  if (!color) color = colors.ui.primary;
  size = sizes[sizesVar["large"]]

  return (
    <LoadingContainer>
      <ActivityIndicator size={size} animating={true} color={color} />
    </LoadingContainer>
  );
};