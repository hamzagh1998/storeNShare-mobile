import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { tryToCatch } from "../utils/try-to-catch";

export const ModeContext = createContext();

export function ModeContextProvider({ children }) {

  const [mode, setMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMode = async () => {
    const [error, data] = await tryToCatch(await AsyncStorage.getItem, "@mode");
    if (error) {
      setError(error);
    } else if (data) {
      setMode(data);
    } else {
      setDefaultMode();
    };
  };

  const setDefaultMode = async () => {
    const [error, data] = await tryToCatch(AsyncStorage.setItem, "@mode", "md-sunny");
    if (error) {
      setError(error);
    } else if (data) {
      setMode(data);
    };setIsLoading(false);
  };

  const setNewMode = async value => {
    const [error, _] = await tryToCatch(AsyncStorage.setItem, "@mode", value);
    if (error) {
      setError(error);
    } else getMode();
  };

  useEffect(() => getMode(), []);

  return (
    <ModeContext.Provider value={{mode, setNewMode, isLoading, error}}>
      { children }
    </ModeContext.Provider>
  );
};
