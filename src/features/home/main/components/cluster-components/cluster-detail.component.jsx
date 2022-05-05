import React, { useState, useEffect } from "react";
import {  ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { MainContainer, RowContainer, CollectionBox, InfoContainer, Centralizer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Text, Searchbar } from "../../../../../components/utilities";


export function ClusterDetailComponent({collections, onCollectionDetail, onShareCollection}) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchRslt, setSearchRslt] = useState([]);

  useEffect(() => setSearchRslt([]), [searchQuery.length, collections.length]);

  const onSubmitSearch = () => {
    setSearchRslt(collections.filter(cluster => 
      cluster.name.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const collectionList = [];
  let row = [];

  const fillCollectionList = arr => {
    if (arr.length) {
      arr.forEach(cluster => {
        if (row.length === 2) {
          collectionList.push(row);
          row = [];
        };row.push(cluster);
      });collectionList.push(row);
    }
  };
  
  !searchRslt.length ? fillCollectionList(collections) : fillCollectionList(searchRslt);

  return (
    <>
      <MainContainer>
        <Spacer />
        <Searchbar
          placeholder="Search for collection"
          autoCapitalize="none"
          onChangeText={value => setSearchQuery(value)}
          onSubmitEditing={onSubmitSearch}
          value={searchQuery} 
        />
        <Spacer position="bottom" size="xl" />
        <ScrollView>
        {
          collectionList.length
            ? collectionList.map(clusterArr => (
                <RowContainer key={Math.random(0, 1)}>
                  {
                    clusterArr.map(collectionObj => (
                      (<CollectionBox key={collectionObj._id} onPress={() => onCollectionDetail(
                        {
                          collectionId: collectionObj._id, 
                          name: collectionObj.name
                        }
                        )}>
                        <Text variant="link">
                          { collectionObj.name.length > 18 ? collectionObj.name.slice(0, 18) + "..." : collectionObj.name }
                        </Text>
                        <Spacer position="top" size="large" /> 
                        <InfoContainer>
                          <Text variant="tiny">lists: { collectionObj.lists.length }</Text>
                          <Spacer size="medium" />
                          <TouchableOpacity 
                            onPress={() => onShareCollection(collectionObj._id)}
                          >
                            <FontAwesome5 name="download" size={20} color="#7ed1d9" /> 
                          </TouchableOpacity> 
                        </InfoContainer>
                      </CollectionBox>)
                  ))
                }
                </RowContainer>
          ))
          : <Centralizer>
              <Text variant="label">no public collection are available</Text>
            </Centralizer>
        }
        </ScrollView>
      </MainContainer>
    </>
  );
};
