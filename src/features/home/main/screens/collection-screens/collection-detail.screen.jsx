import React, { useState, useEffect, useContext } from "react"

import { UserContext } from "../../../../../context/user.context";

import { ViewContainer } from "../../../../../components/utilities";
import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";
import { Text } from "../../../../../components/utilities";

import { CollectionDetailComponent } from "../../components/collection-components/collection-detail.component";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { CollectionService } from "../../../../../services/collection/collectoin.service";
import { ClusterServie } from "../../../../../services/cluster/cluster.service";
import { ListService } from "../../../../../services/list/list.service";


export function CollectionDetailScreen({ route, navigation }) {
  

  const { token } = useContext(UserContext);

  const { collectionId } = route.params;

  const [collectionDetail, setCollectionDetail] = useState({lists: []});
  const [clusterDetail, setClusterDetail] = useState({collections: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onListDetail = params => navigation.navigate("List detail", params);

  const onListShare = async (id, collectionId) => {
    const [err, data] = await tryToCatch(ListService.listShareService, token, id, collectionId);
    if (err || data.error) {
      setError(err ? err : data.error);
      setIsLoading(false);
    } else {
      setError(null);
      setCollectionDetail(data.detail);
      setIsLoading(false);
    }; navigation.navigate("User", {screen: "My Cluster"})
  };

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const [err, data] = await tryToCatch(CollectionService.collectionDetailService, token, collectionId);
      if (err || data.error) {
        mounted && setError(err ? err : data.error);
        mounted && setIsLoading(false);
      } else {
        mounted && setError(null);
        mounted && setCollectionDetail(data.detail);
        mounted && setIsLoading(false);
      };
    };

    const getMyCluster = async () => {
      const [err, data] = await tryToCatch(ClusterServie.myClusterService, token);
      if (err || data.error) {
        mounted && setError(err ? err : data.error);
        mounted && setIsLoading(false);
      } else {
        mounted && setError(null);
        mounted && setClusterDetail(data.detail);
        mounted && setIsLoading(false);
      };
    };
    
    loadData();
    getMyCluster();
    // clean up
    return () => mounted = false;
  }, []);

  return (
    <ViewContainer>
      {
        isLoading 
        ? <LoadingIndicator />
        : error 
            ? <Text>{ error }</Text>
            : <CollectionDetailComponent 
                lists={collectionDetail.lists}
                collections={clusterDetail.collections}
                onListDetail={onListDetail}
                onListShare={onListShare}
              />
      }
    </ViewContainer>
  );
};
