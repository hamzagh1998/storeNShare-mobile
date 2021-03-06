import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';

import { UserContext } from "../../../../context/user.context";

import { ClusterService } from "../../../../services/cluster/cluster.service";
import { CollectionService } from "../../../../services/collection/collectoin.service";
import { logoutService } from "../../../../services/auth/logout.service";

import { ClusterDetailComponent } from "../components/cluster-components/cluster.detail.component";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../utils/try-to-catch";

export function UserMainScreen({ navigation }) {

  const isFocused = useIsFocused();

  const { token, setToken, setUserData } = useContext(UserContext);

  const [myClusterData, setMyClusterData] = useState({collections: []});
  const [reload, setreload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const createNew = async (name, id=null) => {
    if (name === "collection") {
      navigation.navigate(
        "Collection",
        {
          screen: "Create collection",
          params: {id}
        }
      )
    } else {
      navigation.navigate("Create "+name, {id})
    };
  };
  const onUpdateCollection = params => navigation.navigate(
    "Collection", 
    {
      screen: "Update collection", 
      params: params
    });
  const onCollectionDetail = params => navigation.navigate(
    "Collection", 
    {
      screen: "My collection detail", 
      params: params
    });
    
  const onDeleteCollection = async collectionId => {
    setIsLoading(true);
    const [err, data] = await tryToCatch(CollectionService.deleteCollectionService, token, collectionId);
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
    };setreload(true);
    navigation.navigate("My Cluster");
  };

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      const data = await ClusterService.myClusterService(token);
      if (data) {
        if (data.error) {
          mounted && setError(data.detail);
          const res = await logoutService();
          if (res.error && mounted) setError(res.detail);
          else {
            setToken(null);
            setUserData({});
          };
        } else {
          mounted && setMyClusterData(data.detail ? data.detail : {});
        };
      };
      mounted && setIsLoading(false);
      mounted && setreload(false);
    };

    loadData();
    // clean up
    return () => mounted = false;
  } ,[isFocused, error, reload]);
  
  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : <ClusterDetailComponent 
              myClusterData={myClusterData} 
              createNew={createNew} 
              onCollectionDetail={onCollectionDetail}
              onUpdateCollection={onUpdateCollection}
              onDeleteCollection={onDeleteCollection}
            />
      }
    </>
  );
};
