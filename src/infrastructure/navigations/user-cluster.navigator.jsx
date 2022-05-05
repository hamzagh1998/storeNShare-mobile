import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserMainScreen } from "../../features/home/user/screens/user-main.screen";
import { CreateClusterScreen } from "../../features/home/user/screens/cluster-screens/create-cluster.screen";
import { UserCollectionNavigator } from "./user-collection.navigator";

export function UserClusterNavigatior() {
  const ClusterStackNavigator = createNativeStackNavigator();

  return (
    <ClusterStackNavigator.Navigator 
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <ClusterStackNavigator.Screen 
        name="My Cluster" 
        component={UserMainScreen} 
        options={{headerShown: false}}
      />
      <ClusterStackNavigator.Screen 
        name="Create cluster" 
        component={CreateClusterScreen} 
      />
      <ClusterStackNavigator.Screen 
        name="Collection"
        component={UserCollectionNavigator}
        options={{headerShown: false}}
      />
    </ClusterStackNavigator.Navigator>
  );
};