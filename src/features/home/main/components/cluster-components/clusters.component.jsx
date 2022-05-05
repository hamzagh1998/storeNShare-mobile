import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import { MainContainer, RowContainer, CollectionBox, InfoContainer, Centralizer } from "../styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Text, Searchbar } from "../../../../../components/utilities";


export function ClustersComponent({ clusters, onClusterDetail }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchRslt, setSearchRslt] = useState([]);

  useEffect(() => setSearchRslt([]), [searchQuery.length, clusters.length]);

  const onSubmitSearch = () => {
    setSearchRslt(clusters.filter(cluster => 
      cluster.name.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const clusterList = [];
  let row = [];

  const fillClusterList = arr => {
    if (arr.length) {
      arr.forEach(cluster => {
        if (row.length === 2) {
          clusterList.push(row);
          row = [];
        };row.push(cluster);
      });clusterList.push(row);
    }
  };

  !searchRslt.length ? fillClusterList(clusters) : fillClusterList(searchRslt);

  return (
    <>
      <Spacer size="large" />
      <Spacer position="right" size="medium" />
      <Text variant="label">Public Clusters</Text>
      <MainContainer>
        <Spacer position="bottom" size="large" />
        <Searchbar
          placeholder="Search for cluster"
          autoCapitalize="none"
          onChangeText={value => setSearchQuery(value)}
          onSubmitEditing={onSubmitSearch}
          value={searchQuery} 
        />
        <Spacer position="bottom" size="xl" />
        <ScrollView>
        {
          clusterList.length
            ? clusterList.map(clusterArr => (
              <RowContainer key={Math.random(0, 1)}>
                {
                  clusterArr.map(clusterObj => (
                    (<CollectionBox key={clusterObj._id} onPress={() => onClusterDetail(
                      {
                        clusterId: clusterObj._id, 
                        name: clusterObj.name
                      }
                      )}>
                      <Text variant="link">
                        { clusterObj.name.length > 18 ? clusterObj.name.slice(0, 18) + "..." : clusterObj.name }
                      </Text>
                      <Spacer position="top" size="large" /> 
                      <InfoContainer>
                        <Text variant="tiny">collections: { clusterObj.collections.length }</Text>
                        <Spacer size="medium" />
                      </InfoContainer>
                    </CollectionBox>)
                ))
              }
            </RowContainer>
          ))
          : <Centralizer>
              <Text variant="label">no public clusters are available</Text>
            </Centralizer>
        }
        </ScrollView>
      </MainContainer>
    </>
  );
};
