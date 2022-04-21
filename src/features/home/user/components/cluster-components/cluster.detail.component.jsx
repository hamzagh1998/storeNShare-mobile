import React from "react";

import { MyCollectionsComponents } from "../collection-components/my-collections.components";
import { DontHaveComponent } from "../dont-have.component"

import { ViewContainer } from "../../../../../components/utilities";


export function ClusterDetailComponent({ myClusterData, createNew, updateCollection, deleteCollection }) {

  const currentView = myClusterData.collections 
                        ? myClusterData.collections.length
                          ? <MyCollectionsComponents 
                              clusterParent={myClusterData._id}
                              collections={myClusterData.collections} 
                              createNew={createNew}
                              updateCollection={updateCollection}
                              deleteCollection={deleteCollection}
                            />
                          : <DontHaveComponent 
                              myClusterData={myClusterData}
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
