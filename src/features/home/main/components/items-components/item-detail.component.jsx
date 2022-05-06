import React from "react";
import { ScrollView } from "react-native";

import { Spacer } from "../../../../../components/spacer/spacer";
import { ViewContainer, Text } from "../../../../../components/utilities";

import { MainContainer, RowContainer, MiniViewContainer, Hr, CurrentItemContainer } from "../styles";


export function ItemDetailComponent({currentItem, setCurrentItem, items}) {

  return (
    <ViewContainer>
      <MainContainer>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
        >   
          <RowContainer>
            {
              items.map(item => (
                item._id !== currentItem._id &&
                  <Spacer position="right" key={ item.id }>
                    <MiniViewContainer onPress={() => setCurrentItem(item)}>
                      <Text variant="caption">
                        { item.key.length < 15 ? item.key : item.key.slice(0, 12) + "..." }
                      </Text>
                      <Spacer />
                      <Text variant="tiny">
                        { item.value.length < 30 ? item.value : item.value.slice(0, 27) + "..." }
                      </Text>
                    </MiniViewContainer>
                  </Spacer> 
              ))
            }
          </RowContainer>
        </ScrollView>
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