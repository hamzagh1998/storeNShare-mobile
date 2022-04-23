import React, { useState,useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { CreateListComponent } from "../../components/list-components/creat-list.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { ListService } from "../../../../../services/list/list.service";


export function CreatListScreen({ route, navigation }) {

  const { id } = route.params; // collection id

  const { token } = useContext(UserContext);

  const [name, setName] = useState('');
  const [shared, setShared] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCreateList = async () => {
    setIsLoading(true);
    if (name.length) {
      const [error, data] = await tryToCatch(async (token, payload) => (
        ListService.createListService(token, payload)
      ), token, {listInfo: {collectionParent: id, name: name.toLowerCase().trim(), shared}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail.toString());
          setIsLoading(false);
        } else navigation.navigate("Collection", {screen: "My collection detail"});
      }; 
    } else setError("Please enter a list name!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : <CreateListComponent 
              name={name}
              shared={shared}
              error={error}
              setName={setName}
              setShared={setShared}
              onCreateList={onCreateList}
            />
      }
    </>
  );
};
