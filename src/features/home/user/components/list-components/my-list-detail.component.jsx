import React, { useState } from "react";

import { CheckPasswords } from "../../../../generic-components/check-passwords";

import { ViewContainer } from "../../../../../components/utilities";
import { MyItemsComponents } from "../item-components/my-items.components";

export function MyListDetailComponent(
  {
    name,
    shared,
    collectionId,
    items, 
    createNew, 
    onItemDetail, 
    onUpdateItem, 
    onDeleteItem
  }
  ) {

    const [checked, setChecked] = useState(false);

    return (
    <>
      {
        shared || checked
          ?<ViewContainer>
            <MyItemsComponents 
              name={name}
              collectionId={collectionId}
              items={items}
              createNew={createNew}
              onItemDetail={onItemDetail}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
            />
          </ViewContainer>
        : <CheckPasswords 
            text={"Private list!"} 
            setChecked={setChecked}
          />
      }
    </>
  );
};
