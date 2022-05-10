import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";

import { AuthNavigator } from "./auth.navigator";
import { HomeNavigator } from "./home.navigator";

import { UserContext } from "../../context/user.context";
import { ModeContext } from "../../context/mode.context";

import { LoadingIndicator } from "../../components/loading-indicator/loading-indicator";
import { SafeAreaContainer } from "../../components/utilities";

import { theme } from "../theme";


export function Nvaigation() {
  
  const { token, isLoading } = useContext(UserContext);
  const { mode } = useContext(ModeContext);

  const CurrentNavigation = () => token ? <HomeNavigator /> : <AuthNavigator />


  const themes = {...theme, colors: mode === "md-sunny" ? theme.light : theme.dark};

  return (
    <ThemeProvider theme={themes}>
      <NavigationContainer>
        <SafeAreaContainer>
          {
            isLoading 
              ? <LoadingIndicator />
              : <CurrentNavigation />
          }
        </SafeAreaContainer>
      </NavigationContainer>
    </ThemeProvider> 
  );
};
