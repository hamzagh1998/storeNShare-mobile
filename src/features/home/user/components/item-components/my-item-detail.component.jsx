import React from "react";
import { TouchableOpacity, ScrollView, View } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text } from "../../../../../components/utilities";

import { MainContainer, RowContainer, MiniViewContainer, Hr, CurrentItemContainer } from "./item-styles";

export function MyItemDetailComponent({ currentItem, setCurrentItem, items }) {
  
  return (
    <ViewContainer>
      <MainContainer>
        <RowContainer>
          <ScrollView 
            horizontal
            style={{height: "100%"}} 
            showsHorizontalScrollIndicator={false}
          >   
          {
            items.map(item => (
              item._id !== currentItem._id &&
                <Spacer position="right" key={ item.id }>
                  <MiniViewContainer onPress={() => setCurrentItem(item)}>
                    <Text>{ item.key }</Text>
                    <Spacer />
                    <Text variant="tiny">{ item.value }</Text>
                  </MiniViewContainer>
                </Spacer> 
            ))
          }
          </ScrollView>
        </RowContainer>
        <Spacer />
        <CurrentItemContainer>
          <Text variant="cover">{ currentItem.key }</Text>
          <Spacer />
          <Hr />
          <Spacer />
          <ScrollView>
            <Text>{ currentItem.value }</Text>
          </ScrollView>
        </CurrentItemContainer>
      </MainContainer>
    </ViewContainer>
  );
};
