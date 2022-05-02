import React, { useState,useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { CreateItemComponent } from "../../components/item-components/create-item.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { ItemService } from "../../../../../services/item/item.service";


export function CreateItemScreen({ route, navigation }) {

  const { id, collectionId, parentName } = route.params; // list id

  const { token } = useContext(UserContext);

  const [keyVal, setKeyVal] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCreateItem = async () => {
    setIsLoading(true);
    if (keyVal.length && value.length) {
      const [error, data] = await tryToCatch(async (token, payload) => (
        ItemService.createItemService(token, payload)
      ), token, {itemInfo: {listParent: id, key: keyVal.toLowerCase().trim(), value: value.toLocaleLowerCase().trim()}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail.toString());
          setIsLoading(false);
        } else navigation.navigate(
          "List", 
          {
            screen: "My list detail", params: {id, collectionId, name: parentName}
          });
      }; 
    } else setError("Please fill out all fields!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : <CreateItemComponent 
              keyVal={keyVal}
              value={value}
              error={error}
              setKeyVal={setKeyVal}
              setValue={setValue}
              onCreateItem={onCreateItem}
            />
      }
    </>
  );
};
