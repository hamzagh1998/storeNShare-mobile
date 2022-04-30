import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";

import { MyListDetailComponent } from "../../components/list-components/my-list-detail.component";
import { DontHaveComponent } from "../../components/dont-have.component";

import { UserContext } from "../../../../../context/user.context";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { ListService } from "../../../../../services/list/list.service";

import { List } from "../../../../../api/list";


export function MyListDetailScreen({ route, navigation }) {

  const isFocused = useIsFocused();
  const { id, collectionId } = route.params;
  const { token } = useContext(UserContext);

  const [myList, setMyList] = useState({items: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      mounted && setIsLoading(true);
      const [err, data] = await tryToCatch(async (token, id, payload) => (
        await ListService.myListDetailService(token, id, payload)
      ), token, id, {collectionId});
      console.log("MyListDetailScreen", err, data);
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
  }, []);


  return (
    <></>
  );
};
