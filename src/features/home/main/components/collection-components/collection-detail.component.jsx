import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { MainContainer, RectangularContainer, VerLine, Container, Centralizer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Searchbar, Text } from "../../../../../components/utilities";


export function CollectionDetailComponent({lists, onListDetail}) {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchRslt, setShearchRslt] = useState([]);

  useEffect(() => setShearchRslt([]), [searchQuery.length, lists.length]);

  const onSubmitSearch = () => {
    setShearchRslt(lists.filter(list => 
      list.name.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const content = !searchRslt.length ? lists : searchRslt;

  return (
    <MainContainer>
      <Searchbar
        placeholder="Search for list"
        autoCapitalize="none"
        onChangeText={value => setSearchQuery(value)}
        onSubmitEditing={onSubmitSearch}
        value={searchQuery} 
      />
      <Spacer position="bottom" size="large" />
      <ScrollView style={{width: "100%"}}>
        {
          content.length 
            ? content.map(list => (
                <Spacer key={list._id}>
                  <TouchableOpacity onPress={() => 
                    onListDetail({id: list._id, name: list.name, collectionId: list.collectionParent})}
                  >
                    <RectangularContainer>
                      <FontAwesome5 
                        name="globe" 
                        color="#2ecc71"
                        size={34} 
                      />
                      <Spacer position="left" size="large" />
                      <VerLine />
                      <Spacer position="left" size="large" />
                      <Container>
                        <Text variant="body">
                          {list.name.length < 20 ? list.name : list.name.slice(0, 17) + "..."}
                        </Text>
                        <Text variant="tiny">items: {list.items.length}</Text>
                      </Container>
                      <TouchableOpacity onPress={() => null}>
                        <FontAwesome5 name="download" size={24} color="#7ed1d9" /> 
                      </TouchableOpacity>
                    </RectangularContainer>
                  </TouchableOpacity>
                </Spacer>
              ))
            : <Centralizer>
                <Text variant="label">no public list are available</Text>
              </Centralizer>
        }      
      </ScrollView>
    </MainContainer>
  );
};
