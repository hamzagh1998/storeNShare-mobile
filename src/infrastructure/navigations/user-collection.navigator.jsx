import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CreateCollectionScreen } from "../../features/home/user/screens/collection-screens/create-collection.screen";
import { UpdateCollectionScreen } from "../../features/home/user/screens/collection-screens/update-collection.screen";
import { MyCollectionDetailScreen } from "../../features/home/user/screens/collection-screens/my-collection-detail.screen";
import { UserListNavigator } from "./user-list.navigator";


export function UserCollectionNavigator() {
  const CollectionStackNavigator = createNativeStackNavigator();

  return (
    <CollectionStackNavigator.Navigator 
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <CollectionStackNavigator.Screen 
        name="Create collection" 
        component={CreateCollectionScreen} 
      />
      <CollectionStackNavigator.Screen 
        name="Update collection" 
        component={UpdateCollectionScreen} 
      />
      <CollectionStackNavigator.Screen 
        name="My collection detail" 
        component={MyCollectionDetailScreen} 
        options={({ route }) => ({ title: route.params.name + " lists" })}
      />
      <CollectionStackNavigator.Screen 
        name="List"
        component={UserListNavigator}
        options={{headerShown: false}}
      />
    </CollectionStackNavigator.Navigator>
  );
};