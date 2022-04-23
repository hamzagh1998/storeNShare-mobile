import React from "react";

import { MyCollectionsComponents } from "../collection-components/my-collections.components";
import { DontHaveComponent } from "../dont-have.component"

import { ViewContainer } from "../../../../../components/utilities";


export function ClusterDetailComponent({ myClusterData, createNew, onCollectionDetail, updateCollection, deleteCollection }) {

  const currentView = myClusterData.collections 
                        ? myClusterData.collections.length
                          ? <MyCollectionsComponents 
                              clusterParent={myClusterData._id}
                              collections={myClusterData.collections} 
                              createNew={createNew}
                              onCollectionDetail={onCollectionDetail}
                              updateCollection={updateCollection}
                              deleteCollection={deleteCollection}
                            />
                          : <DontHaveComponent 
                              id={myClusterData._id}
                              name="collection" 
                              createNew={createNew} 
                            />
                        : <DontHaveComponent 
                            name="cluster" 
                            createNew={createNew} 
                          />;
    
  return (
    <ViewContainer>
        {currentView}
    </ViewContainer>
  );
};
