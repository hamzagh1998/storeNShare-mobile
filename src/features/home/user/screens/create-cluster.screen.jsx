import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../../../context/user.context";

import { ClusterServie } from "../../../../services/cluster/cluster.service";

import { CreateClusterComponent } from "../components/create-cluster.component";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../utils/try-to-catch";

export function CreateClusterScreen({ navigation }) {

  const {token} = useContext(UserContext);

  const [name, setName] = useState('');
  const [shared, setShared] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const onCreate = async () => {
    setIsLoading(true);
    if (name.length) {
      const [error, data] = await tryToCatch(async (token, payload) => (
        ClusterServie.createClusterService(token, payload)
      ), token, {clusterInfo: {name: name.toLowerCase().trim(), shared}});
      if (error) {
        setError(error);
      }; if (data) {
        if (data.error) {
          setError(data.detail);
          setIsLoading(false);
        } else navigation.navigate("My Cluster", { data: data.detail });
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
              onCreate={onCreate}
            />
      }
    </>
  );
};
