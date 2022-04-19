import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./auth.navigator";
import { HomeNavigation } from "./home.navigation"

import { UserContext } from "../../context/user.context";


import { SafeAreaContainer } from "../../components/utilities";

export function Nvaigation() {
  const { token } = useContext(UserContext);

  const CurrentNavigation = () => token ? <HomeNavigation /> : <AuthNavigator />

  return (
    <NavigationContainer>
      <SafeAreaContainer>
        <CurrentNavigation />
      </SafeAreaContainer>
    </NavigationContainer>
  );
};