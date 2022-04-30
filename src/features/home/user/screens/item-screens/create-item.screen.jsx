import React, { useState,useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { CreateItemComponent } from "../../components/item-components/create-item.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { ItemService } from "../../../../../services/item/item.service";


export function CreateItemScreen({ route, navigation }) {

  const { id, parentName } = route.params; // list id

  const { token } = useContext(UserContext);

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCreateItem = async () => {
    setIsLoading(true);
    if (name.length) {
      const [error, data] = await tryToCatch(async (token, payload) => (
        ItemService.createItemService(token, payload)
      ), token, {itemInfo: {listParent: id, key: key.toLowerCase().trim(), value: value.toLocaleLowerCase().trim}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail.toString());
          setIsLoading(false);
        } else navigation.navigate("Collection", {screen: "My collection detail", params: {collectionId: id, name: parentName}});
      }; 
    } else setError("Please enter a list name!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : <CreateItemComponent 
              key={key}
              value={value}
              error={error}
              setKey={setKey}
              setValue={setValue}
              onCreateItem={onCreateItem}
            />
      }
    </>
  );
};
