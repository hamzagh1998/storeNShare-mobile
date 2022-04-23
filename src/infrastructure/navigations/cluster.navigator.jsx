import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserClusterDetailScreen } from "../../features/home/user/screens/user-cluster-detail.screen";
import { CreateClusterScreen } from "../../features/home/user/screens/cluster-screens/create-cluster.screen";
import { CollectionNavigator } from "./collection.navigator";

export function ClusterNavigatior() {
  const ClusterStackNavigator = createNativeStackNavigator();

  return (
    <ClusterStackNavigator.Navigator 
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <ClusterStackNavigator.Screen 
        name="My Cluster" 
        component={UserClusterDetailScreen} 
        options={{headerShown: false}}
      />
      <ClusterStackNavigator.Screen 
        name="Create cluster" 
        component={CreateClusterScreen} 
      />
      <ClusterStackNavigator.Screen 
        name="Collection"
        component={CollectionNavigator}
        options={{headerShown: false}}
      />
    </ClusterStackNavigator.Navigator>
  );
};