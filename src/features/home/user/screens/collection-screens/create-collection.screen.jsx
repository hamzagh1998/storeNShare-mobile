import React, { useState, useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { CreateCollectionComponent } from "../../components/collection-components/create-collection.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { CollectionService } from "../../../../../services/collection/collectoin.service";

import { tryToCatch } from "../../../../../utils/try-to-catch";

export function CreateCollectionScreen({ route, navigation }) {

  const { id } = route.params;

  const { token } = useContext(UserContext);

  const [name, setName] = useState('');
  const [shared, setShared] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCreateCollection = async () => {
    setIsLoading(true);
    if (name.length) {
      const [error, data] = await tryToCatch(async (token, payload) => (
        CollectionService.createCollectionService(token, payload)
      ), token, {collectionInfo: {clusterParent: id, name: name.toLowerCase().trim(), shared}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail.toString());
          setIsLoading(false);
        } else navigation.navigate("My Cluster");
      }; 
    } else setError("Please enter a collection name!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : <CreateCollectionComponent 
              name={name}
              shared={shared}
              error={error}
              setName={setName}
              setShared={setShared}
              onCreateCollection={onCreateCollection}
            />
      }
    </>
  );
};