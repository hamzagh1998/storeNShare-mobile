import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CreateItemScreen } from "../../features/home/user/screens/item-screens/create-item.screen";
import { UpdateListScreen } from "../../features/home/user/screens/item-screens/update-item.screen";


export function ItemNavigator() {

  const ItemStackNavigator = createNativeStackNavigator();

  return (
    <ItemStackNavigator.Navigator>
      <ItemStackNavigator.Screen 
        name="Create item" 
        component={CreateItemScreen} 
      />
      <ItemStackNavigator.Screen 
        name="update item" 
        component={UpdateListScreen} 
      />
    </ItemStackNavigator.Navigator>
  );
};
