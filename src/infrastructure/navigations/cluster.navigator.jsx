import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainScreen } from "../../features/home/main/screens/main.screen";
import { ClusterDetailScreen } from "../../features/home/main/screens/cluster-screens/cluster-detail.screen"
import { CollectionDetailScreen } from "../../features/home/main/screens/collection-screens/collection-detail.screen";
import { ListDetailScreen } from "../../features/home/main/screens/list-screens/list-detail.screen";
import { ItemDetailScreen } from "../../features/home/main/screens/item-screens/item-detail.screen";


export function ClusterNavigatior() {
  const ClusterStackNavigator = createNativeStackNavigator();

  return (
    <ClusterStackNavigator.Navigator 
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <ClusterStackNavigator.Screen 
        name="Main cluster" 
        component={MainScreen} 
        options={{headerShown: false}}
      />
      <ClusterStackNavigator.Screen
        name="Cluster detail"
        component={ClusterDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <ClusterStackNavigator.Screen
        name="Collection detail"
        component={CollectionDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <ClusterStackNavigator.Screen
        name="List detail"
        component={ListDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <ClusterStackNavigator.Screen 
        name="Item detail"
        component={ItemDetailScreen}
      />
    </ClusterStackNavigator.Navigator>
  );
};