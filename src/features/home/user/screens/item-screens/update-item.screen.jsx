import React, { useState, useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { UpdateItemComponent } from "../../components/item-components/update-item.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch }from "../../../../../utils/try-to-catch";

import { ItemService } from "../../../../../services/item/item.service";


export function UpdateListScreen({ route, navigation }) {
  const { itemId, collectionId, listName, listParent, oldKey, oldValue } = route.params;

  const { token } = useContext(UserContext);

  const [keyVal, setKeyVal] = useState(oldKey);
  const [value, setValue] = useState(oldValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onUpdateItem = async () => {
    setIsLoading(true);
    if (value.length) {
      const [error, data] = await tryToCatch(async (token, itemId, payload) => (
        await ItemService.updateItemService(token, itemId, payload)
      ), token, itemId, {itemInfo: {key: keyVal.toLowerCase().trim(), value: value.toLowerCase().trim(), listParent, }});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail.toString());
          setIsLoading(false);
        } else navigation.navigate(
            "List", 
            {
              screen: "My list detail", 
              params: {id: listParent, name: listName, collectionId}
            });
      }; 
    } else setError("Please enter item value!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading 
          ? <LoadingIndicator />
          : <UpdateItemComponent 
              keyVal={keyVal}
              value={value}
              error={error}
              setKeyVal={setKeyVal}
              setValue={setValue}
              onUpdateItem={onUpdateItem}          
            />
      }
    </>
  );
};
