import React from "react";
import { View, ScrollView } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";

import { MainContainer, Container, FormContainer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text, TextInput, Button } from "../../../../../components/utilities";

export function CreateItemComponent({keyVal, value, error, setKeyVal, setValue, onCreateItem}) {
  
  return (
    <ViewContainer>
      <Spacer size="xxl" />
      <Text variant="cover">Create New Item</Text>
      <MainContainer>
        <Container>
          <Spacer size="xl" />
          <ScrollView width="100%">
            <FormContainer>
              <TextInput 
                label="Key"
                placeholder="Enter the Key"
                value={keyVal}
                autoCapitalize="none"
                onChangeText={value => setKeyVal(value)}
              />
              <Spacer />
              <PaperTextInput 
                label="Value"
                placeholder="Enter the value"
                multiline={true}
                numberOfLines={6}
                style={{width: "100%"}}
                value={value}
                autoCapitalize="none"
                onChangeText={value => setValue(value)}
              />
              <View style={{width: "100%"}}>
                <Text variant="error">{ error }</Text>
              </View>
              <Button icon="content-save" mode="contained" onPress={() => onCreateItem()}>
                Save!
              </Button>
            </FormContainer>
          </ScrollView>
        </Container>
      </MainContainer>
    </ViewContainer>
  );
};
