import React from "react";

import { MyCollectionsComponents } from "../collection-components/my-collections.components";
import { DontHaveComponent } from "../dont-have.component"

import { ViewContainer } from "../../../../../components/utilities";


export function ClusterDetailComponent({ myClusterData, createNew, onCollectionDetail, onUpdateCollection, onDeleteCollection }) {

  const currentView = myClusterData.collections 
                        ? myClusterData.collections.length
                          ? <MyCollectionsComponents 
                              clusterParent={myClusterData._id}
                              collections={myClusterData.collections} 
                              createNew={createNew}
                              onCollectionDetail={onCollectionDetail}
                              onUpdateCollection={onUpdateCollection}
                              onDeleteCollection={onDeleteCollection}
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
