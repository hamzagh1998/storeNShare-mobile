import React, { useContext } from "react";
import { Switch } from "react-native-paper";

import { UserContext } from "../../../../../context/user.context";

import { MainContainer, Container, RowContainer, FormContainer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text, TextInput, Button } from "../../../../../components/utilities";

export function CreateClusterComponent({name, shared, error, setName, setShared, onCreateCluster}) {
  
  const { userData } = useContext(UserContext);
  if (userData.username) setName(`${userData.username}'s cluster`);

  return (
    <ViewContainer>
      <Spacer size="xxl" />
      <Text variant="cover">Create new Cluster</Text>
      <MainContainer>
        <Container>
          <RowContainer>
            <Text variant="label">Public:</Text>
            <Switch value={shared} onValueChange={() => setShared(!shared)} />
          </RowContainer>
          <Spacer size="xl" />
          <FormContainer>
            <TextInput 
              label="Cluster name"
              placeholder="Enter cluster name"
              value={name}
              autoCapitalize="none"
              onChangeText={value => setName(value)}
            />
            <Spacer />
            <Button icon="content-save" mode="contained" onPress={() => onCreateCluster()}>
              Save!
            </Button>
            <Text variant="error">{ error }</Text>
          </FormContainer>
        </Container>
      </MainContainer>
    </ViewContainer>
  );
};
