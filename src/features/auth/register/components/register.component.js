import React from "react";
import { Pressable } from "react-native";

import { ScrollView, RegisterForm, CustemInput } from "./styles";

import { Spacer } from "../../../../components/spacer/spacer"

import { ViewContainer, Text, Image, Button } from "../../../../components/utilities";

import Logo from "../../../../../assets/icon.png";


export function RegisterComponent({userData, error, setUserData, onRegister, onLogin}) {
  return (
    <ViewContainer>
      <Spacer size="xl">
        <Image source={Logo}/>
      </Spacer>
      <Text variant="title">Register</Text>
      <ScrollView>
        <RegisterForm>
          <Spacer size="large">
            <CustemInput
              label="Username"
              value={userData.username}
              placeholder="Enter your username"
              autoCapitalize="none"
              onChangeText={value => setUserData({...userData, username: value.toLocaleLowerCase().trim()})}
            />
          </Spacer>
          <Spacer size="large">
            <CustemInput
              label="Email"
              value={userData.email}
              placeholder="Enter your email"
              autoCapitalize="none"
              onChangeText={value => setUserData({...userData, email: value.toLocaleLowerCase().trim()})}
            />
          </Spacer>
          <Spacer size="large">
            <CustemInput 
              label="Password"
              value={userData.password}
              placeholder="Enter your password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={value => setUserData({...userData, password: value})}
            />
          </Spacer>
          <Spacer size="large">
            <CustemInput 
              label="Confirm Password"
              value={userData.confirmPassword}
              placeholder="Enter your password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={value => setUserData({...userData, confirmPassword: value})}
            />
          </Spacer>
          <Spacer size="large">
            <Button icon="file" mode="contained" onPress={() => onRegister()}>
              Register
            </Button>
            { error && <Text variant="error">{ error }</Text> }
          </Spacer>
          <Spacer size="large">
            <Pressable onPress={() => onLogin()}>
              <Spacer position="left" size="large" />
              <Text variant="success">Login</Text>
            </Pressable>
          </Spacer>
        </RegisterForm>
      </ScrollView>
    </ViewContainer>
  );
};