import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { MainContainer, RowContainer, CollectionBox } from "../collection-components/collection.styles";

import { DeleteButton, CancelButton } from "../../../../generic-components/dialog-buttons";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Dialog } from "../../../../../components/dialog/dialog";
import { Text, Searchbar, AddBox } from "../../../../../components/utilities";


export function MyItemsComponents(
  {
    name,
    collectionId,
    items, 
    createNew, 
    onItemDetail, 
    onUpdateItem,
    onDeleteItem
  }) {


  const [searchQuery, setSearchQuery] = useState('');
  const [searchRslt, setSearchRslt] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [itemId, setItemId] = useState(null);

  useEffect(() => setSearchRslt([]), [searchQuery.length, items.length]);

  const onSubmitSearch = () => {
    setSearchRslt(items.filter(item => 
      item.key.includes(searchQuery.toLocaleLowerCase().trim())
    ));
  };

  const itemList = [];
  let row = [];

  const fillItemList = arr => {
    arr.forEach(item => {
      if (row.length === 2) {
        itemList.push(row);
        row = [];
      };row.push(item);
    });itemList.push(row);
    if (itemList[itemList.length - 1].length === 1) itemList[itemList.length - 1].push({key: ''});
    else itemList.push([{key: ''}]);
  };

  !searchRslt.length ? fillItemList(items) : fillItemList(searchRslt);

  return (
    <>
      <MainContainer visible={showDialog}>
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
          itemList.map(itemArr => (
          <RowContainer key={Math.random(0, 1)}>
            {
              itemArr.map(itemObj => (
                itemObj.key.length
                  ?(<CollectionBox key={itemObj._id} onPress={() => 
                                                    onItemDetail({item: itemObj, name: itemObj.key, items})}
                    >
                      <RowContainer>
                        <TouchableOpacity 
                          style={{width: "50%"}} 
                          onPress={() => {
                            setItemId(itemObj._id)
                            setShowDialog(true)
                          }}
                        >
                          <FontAwesome5 name="trash" size={20} color="#f55" />
                        </TouchableOpacity>   
                        <Spacer position="left" size="xl" />   
                        <TouchableOpacity 
                          onPress={() => onUpdateItem(
                            {
                              itemId: itemObj._id, 
                              collectionId,
                              listName: name,
                              listParent: itemObj.listParent, 
                              oldKey: itemObj.key, 
                              oldValue: itemObj.value 
                            })
                          }
                        >
                          <FontAwesome5 name="edit" size={20} color="#7ed1d9" /> 
                        </TouchableOpacity>   
                      </RowContainer>
                      <Text variant="link">
                        { itemObj.key.length > 18 ? itemObj.key.slice(0, 18) + "..." : itemObj.key }
                      </Text>
                      <Spacer />
                      <Text variant="caption">
                        { itemObj.value.length > 55 ? itemObj.value.slice(0, 55) + "..." : itemObj.value }
                      </Text>
                    </CollectionBox>)
                  : <AddBox 
                      key={Math.random(0, 1)}
                      bgColor1="#4b6584" 
                      bgColor2="#778ca3" 
                      onPress={() => createNew("item")} 
                    />
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
            <DeleteButton onPress ={() => onDeleteItem(itemId)} />,
            <CancelButton onPress={() => setShowDialog(false)} />
          ]}
      />
    </>
  );
};
