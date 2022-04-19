import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../../features/auth/login/screens/login.screen";
import { RegisterScreen } from "../../features/auth/register/screens/register.screen";


export function AuthNavigator() {
  const AuthStackNavigator = createNativeStackNavigator();

  return (
    <AuthStackNavigator.Navigator 
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <AuthStackNavigator.Screen 
        options={{headerShown: false}}
        name="Login" 
        component={LoginScreen} 
      />
      <AuthStackNavigator.Screen 
        options={{headerShown: false}}
        name="Register" 
        component={RegisterScreen} 
      />
    </AuthStackNavigator.Navigator>
  );
};