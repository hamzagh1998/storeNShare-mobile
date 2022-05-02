import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';

import { MyListDetailComponent } from "../../components/list-components/my-list-detail.component";
import { DontHaveComponent } from "../../components/dont-have.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator"

import { UserContext } from "../../../../../context/user.context";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { ListService } from "../../../../../services/list/list.service";
import { ItemService } from "../../../../../services/item/item.service";


export function MyListDetailScreen({ route, navigation }) {
  
  const isFocused = useIsFocused();
  const { id, collectionId, name } = route.params;

  const { token } = useContext(UserContext);

  const [myList, setMyList] = useState({items: []});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [error, setError] = useState(null);

  const createNew = (name, listId) => (
    navigation.navigate(
      "Item", 
      {
        screen: "Create "+name,
        params: { id, parentName: name, collectionId }
      })
  );

  const onItemDetail = params => (
    navigation.navigate(
      "Item",
      {
        screen: "Item detail",
        params: params
      }
    )
  );
  const onUpdateItem = params => (
    navigation.navigate(
      "Item",
      {
        screen: "Update item",
        params: params
      }
    )
  );
  const onDeleteItem = async itemId => {
    setIsLoading(true);
    const [err, data] = await tryToCatch(ItemService.deleteItemService, token, itemId);
    if (err) {
      setError(err);
      setIsLoading(false);
    } else if (data) {
      if (data.error) {
        setError(data.detail);
        setIsLoading(false);
      } else {
        setError(null);
        setIsLoading(false);
      };
    };setReload(!reload);
      navigation.navigate(
        "List",
        {
          screen: "My list detail",
          params: { id, collectionId, name }
        }
      );
  };

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      mounted && setIsLoading(true);
      const [err, data] = await tryToCatch(async (token, id, payload) => (
        await ListService.myListDetailService(token, id, payload)
      ), token, id, {collectionId});
      if (err) {
        mounted && setError(err);
        mounted && setIsLoading(false);
      } else if (data.error) {
        mounted && setError(data.detail);
        mounted && setIsLoading(false);
      } else {
        mounted && setMyList(data.detail);
        mounted && setIsLoading(false);
      };
    };

    loadData();
    // Clean 
    () => mounted = false;
  }, [isFocused, reload]);

  const currentView = myList.items.length 
                        ? <MyListDetailComponent
                            name={name}
                            collectionId={collectionId}
                            items={myList.items}
                            createNew={createNew}
                            onItemDetail={onItemDetail}
                            onUpdateItem={onUpdateItem}
                            onDeleteItem={onDeleteItem}
                          />
                        : <DontHaveComponent 
                            id={myList._id}
                            name="item" 
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
