import React from "react";

import { MainContainer } from "./styles"

import { ViewContainer, Text, Button } from "../../../../components/utilities";


export function DontHaveComponent({ myClusterData=null, name, createNew }) {

  let clusterId = null;
  clusterId = myClusterData && myClusterData._id;

  return (
    <ViewContainer>
      <MainContainer>
        <Text variant="cover">You don't have { name }!</Text>
      </MainContainer>
      <Button icon="plus" mode="contained" onPress={() => createNew(name, clusterId)}>
        Create new { name }!
      </Button>
    </ViewContainer>
  );
};
