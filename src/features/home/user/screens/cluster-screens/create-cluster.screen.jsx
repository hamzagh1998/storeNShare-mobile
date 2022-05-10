import React, { useState, useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { ClusterService } from "../../../../../services/cluster/cluster.service";

import { CreateClusterComponent } from "../../components/cluster-components/create-cluster.component";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

export function CreateClusterScreen({ navigation }) {

  const {token} = useContext(UserContext);

  const [name, setName] = useState('');
  const [shared, setShared] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const onCreateCluster = async () => {
    setIsLoading(true);
    if (name.length) {
      const [error, data] = await tryToCatch(async (token, payload) => (
        ClusterService.createClusterService(token, payload)
      ), token, {clusterInfo: {name: name.toLowerCase().trim(), shared}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail);
          setIsLoading(false);
        } else navigation.navigate("My Cluster");
      }; 
    } else setError("Please enter cluster name!");
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading
          ? <LoadingIndicator />
          : <CreateClusterComponent 
              name={name}
              shared={shared}
              error={error}
              setName={setName}
              setShared={setShared}
              onCreateCluster={onCreateCluster}
            />
      }
    </>
  );
};
