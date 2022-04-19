import React, { useState, useContext } from "react";
import { Text, Button } from "react-native";

import { UserContext } from "../../../../context/user.context";

import { logoutService } from "../../../../services/auth/logout.service";

import { LoadingIndicator } from "../../../../components/loading-indicator/loading-indicator"


export function SettingsScreen() {

  const { setToken, setUserData } = useContext(UserContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const onLogout = async () => {
    let mounted = true;
    if (mounted) {
      setIsLoading(true);
      const res = await logoutService();
        if (res.error) setError(res.detail);
        else {
          setToken(null);
          setUserData(null);
        };
    }; return () => mounted = false;
  };

  return (
    <>
      {
        isLoading 
          ? <LoadingIndicator />
          : <>
              <Text>{ error }</Text>
              <Button title="Logout" onPress={onLogout} />
            </>
      }
    </>

  );
};
