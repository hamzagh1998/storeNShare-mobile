import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../../../../context/user.context";

import { ListDetailComponent } from "../../components/list-component/list-detail.component";

import { ViewContainer } from "../../../../../components/utilities";
import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator"

import { ListService } from "../../../../../services/list/list.service";

import { tryToCatch } from "../../../../../utils/try-to-catch";

export function ListDetailScreen({route, navigation}) {

  const { token } = useContext(UserContext);

  const { id } = route.params;

  const [listDetail, setListDetail] = useState({items: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onItemDetail = params => navigation.navigate("Item detail", params);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const [err, data] = await tryToCatch(ListService.listDetailService, token, id);
      if (err || data.error) {
        mounted && setError(err ? err : data.error);
        mounted && setIsLoading(false);
      } else {
        mounted && setError(null);
        mounted && setListDetail(data.detail);
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
          : <ListDetailComponent 
              items={listDetail.items}
              onItemDetail={onItemDetail}
            />
      }
    </ViewContainer>
  );
};
