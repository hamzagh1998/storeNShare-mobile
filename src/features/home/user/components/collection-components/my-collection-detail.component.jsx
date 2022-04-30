import React, { useState } from "react";

import { CheckPasswords } from "../../../../generic-components/check-passwords";
import { MyListsComponent } from "../list-components/my-lists.component";

import { ViewContainer, Text } from "../../../../../components/utilities";

export function MyCollectionDetailComponent(
  { myCollection, onCreateList, onListDetail,  onUpdateList, onDeleteList, error }
  ) {

  const { lists, shared } = myCollection;
  const [checked, setChecked] = useState(false);


  const currentView = shared || checked
                        ? <ViewContainer>
                            {
                              error 
                              ? <Text variant="error">{ error }</Text> 
                              : <MyListsComponent 
                                  lists={lists} 
                                  onListDetail={onListDetail}
                                  onCreateList={onCreateList}
                                  onUpdateList={onUpdateList} 
                                  onDeleteList={onDeleteList}
                                />
                            }
                          </ViewContainer>
                        : <CheckPasswords 
                            text={"Private collection!"} 
                            setChecked={setChecked}
                          />

  return currentView;
};
