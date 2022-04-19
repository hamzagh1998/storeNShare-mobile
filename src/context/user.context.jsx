import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { tryToCatch } from "../utils/try-to-catch";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = async () => {
    const [error, data] = await tryToCatch(await AsyncStorage.getItem, "@token");
    if (error) {
      setError(error);
    } else if (data) {
      setToken(data);
    };setIsLoading(false);
  };

  const getUserData = async () => {
    const [error, data] = await tryToCatch(await AsyncStorage.getItem, "@userData");
    if (error) {
      setError(error);
    } else if (data) {
      const formattedData = JSON.parse(data);
      setUserData(formattedData);
    };setIsLoading(false);
  };

  useEffect(() => {
    getToken();
    getUserData();
  }, []);

  return (
    <UserContext.Provider 
      value={{token, userData, isLoading, error, setToken, setUserData, getToken, getUserData}}
    >
      { children }
    </UserContext.Provider>
  )

};