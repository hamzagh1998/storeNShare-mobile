import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';

import { MyCollectionDetailComponent } from "../../components/collection-components/my-collection-detail.component";
import { DontHaveComponent } from "../../components/dont-have.component";

import { UserContext } from "../../../../../context/user.context";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { CollectionService } from "../../../../../services/collection/collectoin.service";
import { ListService } from "../../../../../services/list/list.service";


export function MyCollectionDetailScreen({ route, navigation }) {

  const isFocused = useIsFocused();
  const { collectionId } = route.params;

  const { token } = useContext(UserContext);

  const [myCollection, setMyCollection] = useState({lists: []});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setreload] = useState(false);
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
      }; 
      mounted && setIsLoading(false);
      mounted && setreload(false);
    };

    loadData();
    // clean up
    return () => mounted = false;
  }, [isFocused, reload]);

  const createNew = (name, id, parentName=myCollection.name) => {
    navigation.navigate(
      "List",
      {
        screen: "Create "+name,
        params: { id, parentName }
      }
    )
  };

  const onListDetail = params => navigation.navigate(
    "List",
    {
      screen: "My list detail",
      params: params
    }
  );

  const onUpdateList = params => navigation.navigate(
    "List", 
    {
      screen: "Update list",
      params: params
    }
  );

  const onCreateList = () => navigation.navigate(
    "List",
    {
      screen: "Create list",
      params: {id: myCollection._id, parentName: myCollection.name}
    }
  );

  const onDeleteList = async listId => {
    setIsLoading(true);
    const [error, data] = await tryToCatch(ListService.deleteListService, token, listId);
    if (error) {
      setError(error);
      setIsLoading(false);
    } else if (data) {
      if (data.error) {
        setError(data.detail);
        setIsLoading(false);
      } else {
        setError(null);
        setIsLoading(false);
      };
    };setreload(true);
    navigation.navigate(
      "Collection",
      {
        screen: "My collection detail",
        params: {collectionId: myCollection._id, name: myCollection.name}
      }
    );
  };

  const currentView = myCollection.lists.length
                        ? <MyCollectionDetailComponent 
                            myCollection={myCollection}
                            onListDetail={onListDetail}
                            onCreateList={onCreateList}
                            onUpdateList={onUpdateList}
                            onDeleteList={onDeleteList}
                            error={error}
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
