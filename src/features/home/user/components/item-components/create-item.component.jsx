import React from "react";
import { View } from "react-native";

import { MainContainer, Container, FormContainer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text, TextInput, Button } from "../../../../../components/utilities";

export function CreateItemComponent({key, value, error, setKey, setValue, onCreateItem}) {
  
  return (
    <ViewContainer>
      <Spacer size="xxl" />
      <Text variant="cover">Create New List</Text>
      <MainContainer>
        <Container>
          <Spacer size="xl" />
          <FormContainer>
            <TextInput 
              label="Item name"
              placeholder="Enter Item name"
              value={key}
              autoCapitalize="none"
              onChangeText={value => setKey(value)}
            />
            <Spacer />
            <View style={{width: "100%"}}>
              <Text variant="error">{ error }</Text>
            </View>
            <Button icon="content-save" mode="contained" onPress={() => onCreateItem()}>
              Save!
            </Button>
          </FormContainer>
        </Container>
      </MainContainer>
    </ViewContainer>
  );
};
