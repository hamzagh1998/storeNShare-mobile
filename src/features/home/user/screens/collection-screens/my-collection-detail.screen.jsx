import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';

import { MyCollectionDetailComponent } from "../../components/collection-components/my-collection-detail.component";
import { DontHaveComponent } from "../../components/dont-have.component";

import { UserContext } from "../../../../../context/user.context";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { CollectionService } from "../../../../../services/collection/collectoin.service";

export function MyCollectionDetailScreen({ route, navigation }) {

  const isFocused = useIsFocused();

  const { collectionId } = route.params;

  const { token } = useContext(UserContext);

  const [myCollection, setMyCollection] = useState({lists: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const [err, data ] = await tryToCatch(CollectionService.myCollectionDetailService, token, collectionId);
      if (err) {
        mounted && setError(err);
        mounted && setIsLoading(false);
      } else if (data) {
        if (data.error) {
          mounted && setError(err);
          mounted && setIsLoading(false);
        } else mounted && setMyCollection(data.detail);
      }; mounted && setIsLoading(false);
    };

    loadData()
    // clean up
    return () => mounted = false;
  }, [isFocused]);

  const createNew = (name, id) => {
    navigation.navigate(
      "List",
      {
        screen: "Create "+name,
        params: { id }
      }
    )
  };

  const currentView = myCollection.lists.length
                        ? <MyCollectionDetailComponent 
                            myCollection={myCollection}
                          />
                        : <DontHaveComponent 
                            id={collectionId}
                            name="list" 
                            createNew={createNew} 
                          />

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : currentView
      }
    </>
  );
};
