import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';
import { Text } from "react-native";

import { UserContext } from "../../../../context/user.context";

import { logoutService } from "../../../../services/auth/logout.service";
import { ClusterService } from "../../../../services/cluster/cluster.service";

import { ClustersComponent } from "../components/cluster-components/clusters.component";
 
import { ViewContainer } from "../../../../components/utilities";
import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator";

export function MainScreen({navigation}) {

  const { token, userData, setToken, setUserData } = useContext(UserContext);

  const [clusters, setClusters] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      const data = await ClusterService.allClustersService(token);
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
          mounted && setClusters(data.detail ? data.detail : {});
        };
      };
      mounted && setIsLoading(false);
    };

    loadData();
    // clean up
    return () => mounted = false;
  } ,[isFocused, error]);

  const onClusterDetail = params => navigation.navigate("Cluster detail", params);

  return (
    <ViewContainer>
      {
        isLoading 
        ? <LoadingIndicator />
        : error 
            ? <Text>{ error }</Text>
            : <ClustersComponent 
                clusters={clusters.filter(cluster => cluster._id !== userData.cluster)}
                onClusterDetail={onClusterDetail}
              />
      }
    </ViewContainer>
  );
};
