import React from "react";

import { ViewContainer } from "../../../../../components/utilities";
import { MyItemsComponents } from "../item-components/my-items.components";

export function MyListDetailComponent(
  {
    name,
    collectionId,
    items, 
    createNew, 
    onItemDetail, 
    onUpdateItem, 
    onDeleteItem
  }
  ) {


    return (
    <ViewContainer>
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
  );
};
