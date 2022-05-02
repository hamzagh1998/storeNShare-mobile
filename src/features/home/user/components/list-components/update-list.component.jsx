import React, { useState } from "react";
import { View } from "react-native";
import { Switch } from "react-native-paper";

import { CheckPasswords } from "../../../../generic-components/check-passwords";

import { MainContainer, Container, RowContainer, FormContainer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text, TextInput, Button } from "../../../../../components/utilities";

export function UpdateListComponent({name, shared, error, setName, setShared, onUpdateList}) {

  const [checked, setChecked] = useState(false);

  return (
    <>
      {
        shared || checked
          ? <ViewContainer>
              <Spacer size="xxl" />
              <Text variant="cover">Update List</Text>
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
                    <View style={{width: "100%"}}>
                      <Text variant="error">{ error }</Text>
                    </View>
                    <Button icon="content-save" mode="contained" onPress={() => onUpdateList()}>
                      Update!
                    </Button>
                  </FormContainer>
                </Container>
              </MainContainer>
            </ViewContainer>
          : <CheckPasswords 
              text={"Private collection!"} 
              setChecked={setChecked}
            />
      }
    </>
  );
};