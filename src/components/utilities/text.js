import styled from "styled-components/native";

const defaultTextStyles = theme => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 0px;
`;

const title = theme =>`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.h3};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.title};
`;

const body = theme => `
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.body};
`;

const hint = theme => `
    font-size: ${theme.fontSizes.body};
`;

const error = theme => `
    color: ${theme.colors.text.error};
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.medium};
`;

const caption = theme => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = theme => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.medium};
`;

const success = theme => `
  font-size: ${theme.fontSizes.body};
  color: ${theme.colors.text.success};
`;

const cover = theme => `
  font-size: ${theme.fontSizes.h5};
  font-weight: ${theme.fontWeights.bold};
`;

const variants = {
  title,
  body,
  label,
  caption,
  error,
  hint,
  success,
  cover
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = { variant: "body" };