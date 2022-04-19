import React from "react";

import { MainContainer } from "./styles"

import { ViewContainer, Text, Button } from "../../../../components/utilities";

export function EmptyComponent({myClusterData, createNewCluster}) {

  return (
    <ViewContainer>
      <MainContainer>
        <Text variant="cover">You don't have cluster!</Text>
      </MainContainer>
      <Button icon="plus" mode="contained" onPress={createNewCluster}>
        Create new cluster!
      </Button>
    </ViewContainer>
  )
};