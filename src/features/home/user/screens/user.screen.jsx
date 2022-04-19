import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';

import { UserContext } from "../../../../context/user.context";

import { ClusterServie } from "../../../../services/cluster/cluster.service";
import { logoutService } from "../../../../services/auth/logout.service";

import { ClusterDetailComponent } from "../components/cluster.detail.component";
import { EmptyComponent } from "../components/empty.component";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator"

export function UserScreen({ route, navigation }) {

  const isFocused = useIsFocused();

  const { token, setToken, setUserData } = useContext(UserContext);

  const [myClusterData, setMyClusterData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const createNewCluster = () => navigation.navigate("Create Cluster");

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      const data = await ClusterServie.myClusterService(token);
      if (data) {
        if (data.error) {
          mounted && setError(data.detail);
          const res = await logoutService();
          if (res.error && mounted) setError(res.detail);
          else {
            setToken(null);
            setUserData(null);
          };
        } else {
          mounted && setMyClusterData(data.detail ? data.detail : {});
        };
      };
      mounted && setIsLoading(false);
    };

    loadData();
    // clean up
    return () => mounted = false;
  } ,[isFocused, myClusterData._id]);

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : myClusterData._id
           ? <ClusterDetailComponent myClusterData={myClusterData} />
           : <EmptyComponent myClusterData={myClusterData} createNewCluster={createNewCluster} />
      }
    </>
  );
};
