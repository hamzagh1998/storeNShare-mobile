import React, { useState } from "react";

import { ItemDetailComponent } from "../../components/items-components/item-detail.component";

export function ItemDetailScreen({ route }) {
  const { item, items } = route.params;

  const [currentItem, setCurrentItem] = useState(item);

  return <ItemDetailComponent 
          items={items}
          currentItem={currentItem} 
          setCurrentItem={setCurrentItem}   
        />;
};
