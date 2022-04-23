import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from 'react-native';
import { Button } from "react-native-paper";
import { FontAwesome5 } from '@expo/vector-icons';

import { MainContainer, RowContainer, CollectionBox, InfoContainer } from "./collection.styles";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Dialog } from "../../../../../components/dialogue/dialog";
import { Text, Searchbar, AddBox } from "../../../../../components/utilities";

export function MyCollectionsComponents({ clusterParent, collections, createNew, onCollectionDetail, updateCollection, deleteCollection }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchRslt, setShearchRslt] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [collectionId, setCollectionId] = useState(null);

  useEffect(() => setShearchRslt([]), [!searchQuery.length, collections.length]);

  const onSubmitSearch = () => {
    setShearchRslt(collections.filter(collection => 
      collection.name.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const collectionList = [];
  let row = [];

  const fillCollectionList = arr => {
    arr.forEach(collection => {
      if (row.length === 2) {
        collectionList.push(row);
        row = [];
      };row.push(collection);
    });collectionList.push(row);
    if (collectionList[collectionList.length - 1].length === 1) collectionList[collectionList.length - 1].push({name: ''});
    else collectionList.push([{name: ''}]);
  };

  !searchRslt.length ? fillCollectionList(collections) : fillCollectionList(searchRslt);

  const DeleteButton = <Button 
    width="50%" 
    style={{marginRight: 5, justifyContent: "center"}}
    mode="contained"
    icon="delete"
    compact={true}
    color="#f55"
    onPress={() => deleteCollection(collectionId)}
  >Delete</Button>;

  const CancelButton = <Button 
    width="50%" 
    style={{justifyContent: "center"}}
    mode="contained"
    icon="cancel"
    compact={true}
    color="#7ed1d9"
    onPress={() => setShowDialog(false)}
  >Cancel</Button>;

  return (
    <>
      <Text variant="label">Your Collections</Text>
      <MainContainer visible={showDialog}>
        <Spacer position="bottom" size="large" />
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
          collectionList.map(collectionArr => (
          <RowContainer key={Math.random(0, 1)}>
            {
              collectionArr.map(collectionObj => (
                collectionObj.name.length
                  ?(<CollectionBox key={collectionObj._id} onPress={() => onCollectionDetail(
                    {
                      collectionId: collectionObj._id, 
                      name: collectionObj.name
                    }
                    )}>
                      <RowContainer>
                        <TouchableOpacity 
                          style={{width: "50%"}} 
                          onPress={() => {
                            setCollectionId(collectionObj._id)
                            setShowDialog(true)
                          }}
                        >
                          <FontAwesome5 name="trash" size={20} color="#f55" />
                        </TouchableOpacity>   
                        <Spacer position="left" size="xl" />   
                        <TouchableOpacity 
                          onPress={async () => {
                            await updateCollection(
                              {
                                collectionId: collectionObj._id,
                                oldName: collectionObj.name, 
                                oldShared: collectionObj.shared
                              });
                          }}
                        >
                          <FontAwesome5 name="edit" size={20} color="#7ed1d9" /> 
                        </TouchableOpacity>   
                      </RowContainer>
                      <Spacer position="top" size="large" />  
                      <Text variant="link">
                        { collectionObj.name.length > 18 ? collectionObj.name.slice(0, 18) + "..." : collectionObj.name }
                      </Text>
                      <InfoContainer>
                        <Text variant="tiny">lists: { collectionObj.lists.length }</Text>
                        <Text variant="tiny">state: { collectionObj.shared ? "public" : "private" }</Text>
                      </InfoContainer>
                    </CollectionBox>)
                  : <AddBox 
                      key={Math.random(0, 1)}
                      bgColor1="#e64a8d" 
                      bgColor2="#ea619c" 
                      onPress={() => createNew("collection", clusterParent)} />
              ))
            }
          </RowContainer>
          ))
        }
        </ScrollView>
      </MainContainer>
      <Dialog 
        visible={showDialog}
        onClose={setShowDialog}
        title="Delete collection" 
        content="Are you sure you want to delete this collection?" 
        bottons={[DeleteButton, CancelButton]}
      />
    </>
  );
};
