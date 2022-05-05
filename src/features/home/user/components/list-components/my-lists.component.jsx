import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import { MainContainer, RectangularContainer, VerLine, Container, RowConatiner } from "./lists-styles";

import { DeleteButton, CancelButton } from "../../../../generic-components/dialog-buttons";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Dialog } from "../../../../../components/dialog/dialog";
import { Searchbar, Text, AddCircle } from "../../../../../components/utilities";

export function MyListsComponent({ lists, onListDetail, onCreateList, onUpdateList, onDeleteList }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchRslt, setShearchRslt] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [listId, setListId] = useState(null);

  useEffect(() => setShearchRslt([]), [searchQuery.length, lists.length]);

  const onSubmitSearch = () => {
    setShearchRslt(lists.filter(list => 
      list.name.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const content = !searchRslt.length ? lists : searchRslt;

  return (
    
    <>
      <MainContainer visible={showDialog}>
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
            content.map(list => (
              <Spacer key={list._id}>
                <TouchableOpacity onPress={() => 
                  onListDetail({id: list._id, name: list.name, collectionId: list.collectionParent})}
                >
                  <RectangularContainer>
                    <FontAwesome5 
                      name={list.shared ? "globe": "lock"} 
                      color={list.shared ? "#2ecc71": "#f55"} 
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
                    <RowConatiner>
                      {/* Update */}
                      <TouchableOpacity 
                        onPress={() => 
                          onUpdateList(
                            {
                              listId: list._id, 
                              collectionName: list.name,
                              collectionParent: list.collectionParent, 
                              oldName: list.name, 
                              oldShared: list.shared
                            })}
                      >
                        <FontAwesome5 name="edit" size={24} color="#7ed1d9" /> 
                      </TouchableOpacity>
                      <Spacer position="left" size="large" />
                      {/* Delete */}
                      <TouchableOpacity onPress={() => {
                        setListId(list._id)
                        setShowDialog(true)
                      }}>
                        <FontAwesome5 name="trash" size={24} color="#f55" />
                      </TouchableOpacity>
                    </RowConatiner>
                  </RectangularContainer>
                </TouchableOpacity>
              </Spacer>
            ))
          }
          
        <Spacer position="top" size="xxl" />
        </ScrollView>
        <AddCircle bgColor1="#27ae60" bgColor2="#2ecc71" onPress={onCreateList} />
      </MainContainer>
      <Dialog 
      visible={showDialog}
      onClose={setShowDialog}
      title="Delete list" 
      content="Are you sure you want to delete this list?" 
      buttons={
        [
          <DeleteButton onPress ={() => onDeleteList(listId)} />,
          <CancelButton onPress={() => setShowDialog(false)} />
        ]}
    />
  </>
  );
};
