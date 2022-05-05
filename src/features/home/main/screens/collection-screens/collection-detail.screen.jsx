import React, { useState, useEffect, useContext } from "react"

import { UserContext } from "../../../../../context/user.context";

import { ViewContainer } from "../../../../../components/utilities";
import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";
import { Text } from "../../../../../components/utilities";

import { CollectionDetailComponent } from "../../components/collection-components/collection-detail.component";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { CollectionService } from "../../../../../services/collection/collectoin.service";


export function CollectionDetailScreen({ route, navigation }) {
  

  const { token } = useContext(UserContext);

  const { collectionId } = route.params;

  const [collectioDetail, setCollectionDetail] = useState({lists: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onListDetail = params => navigation.navigate("List detail", params);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const [err, data] = await tryToCatch(CollectionService.collectionDetailService, token, collectionId);
      if (err || data.error) {
        mounted && setError(err ? err : data.error);
        mounted && setIsLoading(false);
      } else {
        mounted && setError(null);
        mounted && setCollectionDetail(data.detail);
        mounted && setIsLoading(false);
      };
    }
    
    loadData();
    // clean up
    return () => mounted = false;
  }, []);

  return (
    <ViewContainer>
      {
        isLoading 
        ? <LoadingIndicator />
        : error 
            ? <Text>{ error }</Text>
            : <CollectionDetailComponent 
                lists={collectioDetail.lists}
                onListDetail={onListDetail}
              />
      }
    </ViewContainer>
  );
};
