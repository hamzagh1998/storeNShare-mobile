import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { MainContainer, RectangularContainer, VerLine, Container, Centralizer } from "../styles";

import { CollectionList } from "./collection-list";

import { Spacer } from "../../../../../components/spacer/spacer";
import { PopUp } from "../../../../../components/pop-up/pop-up";
import { Searchbar, Text } from "../../../../../components/utilities";


export function CollectionDetailComponent({ lists, collections, onListDetail, onListShare }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchRslt, setShearchRslt] = useState([]);
  const [listId, setListId] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [visible, setVisible] = useState(false);


  useEffect(() => setShearchRslt([]), [searchQuery.length, lists.length]);

  const onSubmitSearch = () => {
    setShearchRslt(lists.filter(list => 
      list.name.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const content = !searchRslt.length ? lists : searchRslt;

  return (
    <>
      <MainContainer visible={visible}>
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
                    <TouchableOpacity onPress={
                      () => onListDetail({id: list._id, name: list.name, collectionId: list.collectionParent})
                    }>
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
                        {
                          collections.length
                            ? <TouchableOpacity onPress={() => {
                              setVisible(true);
                              setListId(list._id)
                              }}>
                                <FontAwesome5 name="download" size={24} color="#7ed1d9" /> 
                              </TouchableOpacity>
                            : null
                        }
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
      <PopUp 
        title="Select collection:"
        visible={visible}
        height="65%"
        content={<CollectionList collections={collections} setCollectionId={setCollectionId} />}
        action={() => onListShare(listId, collectionId)}
        onClose={() => setVisible(false)}
        btnText="store"
        icon="download"
      />
    </>
  );
};
