import React, { useState, useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { UpdateCollectionComponent } from "../../components/collection-components/update-collection.component"

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch }from "../../../../../utils/try-to-catch";

import { CollectionService } from "../../../../../services/collection/collectoin.service";


export function UpdateCollectionScreen({ route, navigation }) {


  const { collectionId, oldName, oldShared } = route.params;

  const { token } = useContext(UserContext);

  const [name, setName] = useState(oldName);
  const [shared, setShared] = useState(oldShared);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onUpdateCollection = async () => {
    setIsLoading(true);
    if (name.length) {
      const [error, data] = await tryToCatch(async (token, collectionId, payload) => (
        CollectionService.updateCollectionService(token, collectionId, payload)
      ), token, collectionId, {collectionInfo: {name: name.toLowerCase().trim(), shared}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail.toString());
          setIsLoading(false);
        } else navigation.navigate("My Cluster");
      }; 
    } else setError("Please enter collection name!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading 
          ? <LoadingIndicator />
          : <UpdateCollectionComponent 
              name={name}
              shared={shared}
              error={error}
              setName={setName}
              setShared={setShared}
              onUpdateCollection={onUpdateCollection}            
            />
      }
    </>
  );
};
 