import React from "react";
import { Switch } from "react-native-paper";


import { MainContainer, Container, RowContainer, FormContainer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text, TextInput, Button } from "../../../../../components/utilities";

export function CreateCollectionComponent({name, shared, error, setName, setShared, onCreateCollection}) {
  
  return (
    <ViewContainer>
      <Spacer size="xxl" />
      <Text variant="cover">Create New Collection</Text>
      <MainContainer>
        <Container>
          <RowContainer>
            <Text variant="label">Public:</Text>
            <Switch value={shared} onValueChange={() => setShared(!shared)} />
          </RowContainer>
          <Spacer size="xl" />
          <FormContainer>
            <TextInput 
              label="Collection name"
              placeholder="Enter Collection name"
              value={name}
              autoCapitalize="none"
              onChangeText={value => setName(value)}
            />
            <Spacer />
            <Button icon="content-save" mode="contained" onPress={() => onCreateCollection()}>
              Save!
            </Button>
            <Text variant="error">{ error }</Text>
          </FormContainer>
        </Container>
      </MainContainer>
    </ViewContainer>
  );
};
