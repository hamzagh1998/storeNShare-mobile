import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { UserContext } from "../../../../../context/user.context";

import { MainContainer, RowContainer, CollectionBox, InfoContainer } from "./collection.styles";

import { DeleteButton, CancelButton } from "../../../../generic-components/dialog-buttons";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Dialog } from "../../../../../components/dialog/dialog";
import { Text, Searchbar, AddBox, Image } from "../../../../../components/utilities";


export function MyCollectionsComponents(
  { 
    clusterParent, 
    collections, 
    createNew, 
    onCollectionDetail, 
    onUpdateCollection, 
    onDeleteCollection 
  }) {

  const { userData: { avatar } } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchRslt, setSearchRslt] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [collectionId, setCollectionId] = useState(null);

  useEffect(() => setSearchRslt([]), [searchQuery.length, collections.length]);

  const onSubmitSearch = () => {
    setSearchRslt(collections.filter(collection => 
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

  return (
    <>
      <Spacer size="large" />
      <RowContainer>
        <Image source={{uri: avatar}} width={34} height={34} />
        <Spacer position="right" size="medium" />
        <Text variant="label">Your Collections</Text>
      </RowContainer>
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
                            await onUpdateCollection(
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
                        <FontAwesome5 
                          name={collectionObj.shared ? "globe": "lock"} 
                          color={collectionObj.shared ? "#2ecc71": "#f55"} 
                          size={11} 
                        />
                      </InfoContainer>
                    </CollectionBox>)
                  : <AddBox 
                      key={Math.random(0, 1)}
                      bgColor1="#7f8c8d" 
                      bgColor2="#95a5a6" 
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
        buttons={
          [
            <DeleteButton onPress ={() => onDeleteCollection(collectionId)} />,
            <CancelButton onPress={() => setShowDialog(false)} />
          ]}
      />
    </>
  );
};
