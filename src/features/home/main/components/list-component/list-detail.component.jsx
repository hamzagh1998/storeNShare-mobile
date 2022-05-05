import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

import { MainContainer, RowContainer, CollectionBox, InfoContainer, Centralizer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Text, Searchbar } from "../../../../../components/utilities";

export function ListDetailComponent({ items, onItemDetail }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchRslt, setSearchRslt] = useState([]);

  useEffect(() => setSearchRslt([]), [searchQuery.length, items.length]);

  const onSubmitSearch = () => {
    setSearchRslt(items.filter(item => 
      item.key.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const itemsList = [];
  let row = [];

  const fillItemList = arr => {
    if (arr.length) {
      arr.forEach(item => {
        if (row.length === 2) {
          itemsList.push(row);
          row = [];
        };row.push(item);
      });itemsList.push(row);
    }
  };

  !searchRslt.length ? fillItemList(items) : fillItemList(searchRslt);

  console.log(itemsList.length);

  return (
    <>
      <MainContainer>
        <Searchbar
          placeholder="Search for item"
          autoCapitalize="none"
          onChangeText={value => setSearchQuery(value)}
          onSubmitEditing={onSubmitSearch}
          value={searchQuery} 
        />
        <Spacer position="bottom" size="large" />
        <ScrollView>
        {
          itemsList.length
            ? itemsList.map(itemArr => (
              <RowContainer key={Math.random(0, 1)}>
                {
                  itemArr.map(itemObj => (
                    <CollectionBox key={itemObj._id} onPress={
                        () => onItemDetail({item: itemObj, name: itemObj.key, items})}>
                      <Text variant="link">
                        { itemObj.key.length > 18 ? itemObj.key.slice(0, 18) + "..." : itemObj.key }
                      </Text>
                      <Spacer />
                      <Text variant="caption">
                        { itemObj.value.length > 55 ? itemObj.value.slice(0, 55) + "..." : itemObj.value }
                      </Text>
                    </CollectionBox>
                ))
              }
            </RowContainer>
          ))
          : <Centralizer>
              <Text variant="label">no public items are available</Text>
            </Centralizer>
        }
        </ScrollView>
      </MainContainer>
    </>
  );
};
