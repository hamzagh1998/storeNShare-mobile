import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CreatListScreen } from "../../features/home/user/screens/list-screens/create-list.screen";
import { UpdateListScreen } from "../../features/home/user/screens/list-screens/update-list.screen";
import { MyListDetailScreen } from "../../features/home/user/screens/list-screens/my-list-detail.screen";
import { UserItemNavigator } from "./user-item.navigator";

export function UserListNavigator() {
  const ListStackNavigator = createNativeStackNavigator();

  return (
    <ListStackNavigator.Navigator>
      <ListStackNavigator.Screen 
        name="Create list" 
        component={CreatListScreen} 
      />
      <ListStackNavigator.Screen 
        name="Update list" 
        component={UpdateListScreen} 
      />
      <ListStackNavigator.Screen 
        name="My list detail" 
        component={MyListDetailScreen} 
        options={({ route }) => ({ title: route.params.name + " items" })}
      />
      <ListStackNavigator.Screen 
        name="Item"
        component={UserItemNavigator}
        options={{headerShown: false}}
      />
    </ListStackNavigator.Navigator>
  );
};