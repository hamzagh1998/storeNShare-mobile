import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserScreen } from "../../features/home/user/screens/user.screen";
import { CreateClusterScreen } from "../../features/home/user/screens/create-cluster.screen";


export function ClusterNavigatior() {
  const ClusterStackNavigator = createNativeStackNavigator();

  return (
    <ClusterStackNavigator.Navigator 
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <ClusterStackNavigator.Screen 
        name="My Cluster" 
        component={UserScreen} 
        options={{headerShown: false}}
      />
      <ClusterStackNavigator.Screen 
        name="Create Cluster" 
        component={CreateClusterScreen} 
      />
    </ClusterStackNavigator.Navigator>
  );
};