import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons"

import { ClusterNavigatior } from "./cluster.navigator";

import { MainScreen } from "../../features/home/main/screens/main.screen";
import { SettingsScreen } from "../../features/home/settings/screens/settings.screen";


export function HomeNavigator() {
  const HomeTabNavigation = createBottomTabNavigator();

  const theme = useTheme();

  const TAB_ICON = {
    Main: ["md-home", "md-home-outline"],
    User: ["document-text", "document-text-outline"],
    Settings: ["settings", "settings-outline"]
  };

  const tabThemeHandler = ({ route }) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = focused ? TAB_ICON[route.name][0]: TAB_ICON[route.name][1];
        return <Ionicons name={iconName} size={size} color={color} />; // Tab Icon
      },
      tabBarActiveTintColor: theme.colors.ui.primary,
      tabBarInactiveTintColor: theme.colors.ui.disabled,
      tabBarShowLabel: false,
      headerShown: false
    };
  };

  return (
    <HomeTabNavigation.Navigator screenOptions={tabThemeHandler}>
      <HomeTabNavigation.Screen name="User" component={ClusterNavigatior} />
      <HomeTabNavigation.Screen name="Main" component={MainScreen} />
      <HomeTabNavigation.Screen name="Settings" component={SettingsScreen} />
    </HomeTabNavigation.Navigator>
  );
};