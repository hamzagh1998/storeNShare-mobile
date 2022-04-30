import React from "react";
import { Pressable } from "react-native";

import { ScrollView, LoginForm } from "./styles";

import { Spacer } from "../../../../components/spacer/spacer";

import { ViewContainer, Text, TextInput, Image, Button } from "../../../../components/utilities";

import Logo from "../../../../../assets/icon.png";

export function LoginComponent({emailOrUsername, password, error, setEmailOrUsername, setPassword, onLogin, onRegister}) {
  return (
    <ViewContainer>
      <Spacer size="xxl">
        <Image source={Logo}/>
      </Spacer>
      <Text variant="title">Login</Text>
      <ScrollView>
        <LoginForm>
          <Spacer size="xl">
            <TextInput
              label="Email Or Username"
              value={emailOrUsername}
              placeholder="Enter your email or username"
              autoCapitalize="none"
              onChangeText={value => setEmailOrUsername(value)}
            />
          </Spacer>
          <Spacer size="large">
            <TextInput 
              label="Password"
              value={password}
              placeholder="Enter your password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={value => setPassword(value)}
            />
          </Spacer>
          <Spacer size="large">
            <Button icon="login" mode="contained" onPress={() => onLogin()}>
              Login
            </Button>
            { error && <Text variant="error">{ error }</Text> }
          </Spacer>
          <Spacer size="large">
            <Pressable onPress={() => onRegister()}>
              <Spacer position="left" size="large" />
              <Text variant="success">Register</Text>
            </Pressable>
          </Spacer>
        </LoginForm>
      </ScrollView>
    </ViewContainer>
  );
};
