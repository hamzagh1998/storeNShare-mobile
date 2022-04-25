import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from '@react-navigation/native';

import { MyListDetailComponent } from "../../components/list-components/my-list-detail.component";
import { DontHaveComponent } from "../../components/dont-have.component";

import { UserContext } from "../../../../../context/user.context";

import { LoadingIndicator } from "../../../../../components/loading-indicator/loading-indicator";

import { tryToCatch } from "../../../../../utils/try-to-catch";

import { ListService } from "../../../../../services/list/list.service";


export function MyListDetailScreen({ route, navigation }) {

  const isFocused = useIsFocused();
  const { collectionId } = route.params;

  const { token } = useContext(UserContext);

  const [myCollection, setMyCollection] = useState({lists: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <></>
  );
};
