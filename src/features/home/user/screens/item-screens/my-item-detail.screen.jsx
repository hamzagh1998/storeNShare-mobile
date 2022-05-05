import React, { useState } from "react";

import { MyItemDetailComponent } from "../../components/item-components/my-item-detail.component";

export function MyItemDetailDcreen({ route }) {

  const { item, items } = route.params;

  const [currentItem, setCurrentItem] = useState(item);

  return  <MyItemDetailComponent 
            items={items}
            currentItem={currentItem} 
            setCurrentItem={setCurrentItem} 
          />;
};
