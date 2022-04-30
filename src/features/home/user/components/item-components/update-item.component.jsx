import React from "react";
import { View } from "react-native";

import { MainContainer, Container, FormContainer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text, TextInput, Button } from "../../../../../components/utilities";

export function UpdateItemComponent({key, value, error, setKey, setValue, onUpdateItem}) {

  return (
    <ViewContainer>
      <Spacer size="xxl" />
      <Text variant="cover">Update List</Text>
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
            <Button icon="content-save" mode="contained" onPress={() => onUpdateItem()}>
              Update!
            </Button>
          </FormContainer>
        </Container>
      </MainContainer>
    </ViewContainer>
  );
};