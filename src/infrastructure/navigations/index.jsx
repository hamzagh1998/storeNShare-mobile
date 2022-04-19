import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./auth.navigator";
import { HomeNavigation } from "./home.navigation"

import { UserContext } from "../../context/user.context";

import { LoadingIndicator } from "../../components/loading-indicator/loading-indicator";
import { SafeAreaContainer } from "../../components/utilities";

export function Nvaigation() {
  const { token, isLoading } = useContext(UserContext);
  const CurrentNavigation = () => token ? <HomeNavigation /> : <AuthNavigator />

  return (
    <NavigationContainer>
      <SafeAreaContainer>
        {
          isLoading 
            ? <LoadingIndicator />
            : <CurrentNavigation />
        }
      </SafeAreaContainer>
    </NavigationContainer>
  );
};