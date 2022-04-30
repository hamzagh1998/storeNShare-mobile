import React, { useState, useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { UpdateListComponent } from "../../components/list-components/update-list.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch }from "../../../../../utils/try-to-catch";

import { ListService } from "../../../../../services/list/list.service";


export function UpdateListScreen({ route, navigation }) {
  const { collectionName, listId, collectionParent, oldName, oldShared } = route.params;

  const { token } = useContext(UserContext);

  const [name, setName] = useState(oldName);
  const [shared, setShared] = useState(oldShared);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onUpdateList = async () => {
    setIsLoading(true);
    if (name.length) {
      const [error, data] = await tryToCatch(async (token, listId, payload) => (
        await ListService.updateListService(token, listId, payload)
      ), token, listId, {listInfo: {name: name.toLowerCase().trim(), collectionParent, shared}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail.toString());
          setIsLoading(false);
        } else navigation.navigate(
            "Collection", 
            {
              screen: "My collection detail", 
              params: {collectionId: collectionParent, name: collectionName}
            });
      }; 
    } else setError("Please enter list name!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading 
          ? <LoadingIndicator />
          : <UpdateListComponent 
              name={name}
              shared={shared}
              error={error}
              setName={setName}
              setShared={setShared}
              onUpdateList={onUpdateList}            
            />
      }
    </>
  );
};
