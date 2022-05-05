import React, { useState, useEffect, useContext } from "react"

import { UserContext } from "../../../../../context/user.context";

import { ViewContainer } from "../../../../../components/utilities";
import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";
import { Text } from "../../../../../components/utilities";

import { ClusterDetailComponent } from "../../components/cluster-components/cluster-detail.component";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { ClusterServie } from "../../../../../services/cluster/cluster.service";
import { CollectionService } from "../../../../../services/collection/collectoin.service";

export function ClusterDetailScreen({ route, navigation }) {

  const { token } = useContext(UserContext);

  const { clusterId } = route.params;

  const [clusterDetail, setClusterDetail] = useState({collections: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onCollectionDetail = params => navigation.navigate("Collection detail", params);

  const onShareCollection = async collectionId => {
    setIsLoading(true);
    const [err, data] = await tryToCatch(CollectionService.shareCollectionService, token, collectionId);
    if (err) {
      setError(err);
      setIsLoading(false);
    } else if (data.error) {
      setError(err);
      setIsLoading(false);
    }; navigation.navigate("User", {screen: "My Cluster"});
  };
  
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const [err, data] = await tryToCatch(ClusterServie.clusterDetailService, token, clusterId);
      if (err || data.error) {
        mounted && setError(err ? err : data.error);
        mounted && setIsLoading(false);
      } else {
        mounted && setError(null);
        mounted && setClusterDetail(data.detail);
        mounted && setIsLoading(false);
      };
    }
    
    loadData();
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
            : <ClusterDetailComponent 
                collections={clusterDetail.collections}
                onCollectionDetail={onCollectionDetail}
                onShareCollection={onShareCollection}
              />
      }
    </ViewContainer>
  );
};
