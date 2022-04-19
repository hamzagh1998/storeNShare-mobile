import React, { useState, useEffect, useContext } from "react";
import { Text } from "react-native";

import { UserContext } from "../../../../context/user.context";

import { ClusterServie } from "../../../../services/cluster/cluster.service";
import { logoutService } from "../../../../services/auth/logout.service";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator"

export function UserScreen() {

  const { token, setToken, setUserData } = useContext(UserContext);

  const [myClusterData, setMyClusterData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setIsLoading(true);
    const data = await ClusterServie.myClusterService(token);
    if (data) {
      if (data.error) {
        setError(data.detail);
        const res = await logoutService();
        if (res.error) setError(res.detail);
        else {
          setToken(null);
          setUserData(null);
        };
      } else {
        if (data.detail) setMyClusterData(data.detail);
      };
      setIsLoading(false);
    };
  };

  useEffect(() => loadData() ,[myClusterData._id, error]);

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : <Text>{ myClusterData && myClusterData.name }</Text>
      }
    </>
  );
};
