import React from "react";

import { MainContainer } from "./styles"

import { ViewContainer, Text, Button } from "../../../../components/utilities";


export function DontHaveComponent({ id=null, name, createNew }) {

  return (
    <ViewContainer>
      <MainContainer>
        <Text variant="cover">You don't have any { name }!</Text>
      </MainContainer>
      <Button icon="plus" mode="contained" onPress={() => createNew(name, id)}>
        Create new { name }!
      </Button>
    </ViewContainer>
  );
};
