import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./auth.navigator";
import { HomeNavigator } from "./home.navigator"

import { UserContext } from "../../context/user.context";

import { LoadingIndicator } from "../../components/loading-indicator/loading-indicator";
import { SafeAreaContainer } from "../../components/utilities";

export function Nvaigation() {
  const { token, isLoading } = useContext(UserContext);
  const CurrentNavigation = () => token ? <HomeNavigator /> : <AuthNavigator />

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