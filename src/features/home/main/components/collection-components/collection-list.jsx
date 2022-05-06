import React, { useState } from "react";
import { ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";

import { MainContainer, RowContainer } from "../styles";

import { Text } from "../../../../../components/utilities";

export function CollectionList({collections, setCollectionId}) {

  const [checked, setChecked] = useState(null);
  
  return (
    <MainContainer>
      <ScrollView>
        {
          collections.map(collection => (
            <RowContainer key={collection._id}>
              <RadioButton
                value={ collection.name }
                status={ checked === collection.name ? 'checked' : 'unchecked' }
                onPress={() => {
                  setCollectionId(collection._id);
                  setChecked(collection.name);
                }}
              />
              <Text variant="label">{ collection.name }</Text>
            </RowContainer>
          ))
        }
      </ScrollView>
    </MainContainer>
  );
};
