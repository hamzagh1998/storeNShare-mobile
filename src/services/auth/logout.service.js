import AsyncStorage from "@react-native-async-storage/async-storage";

import { tryToCatch } from "../../utils/try-to-catch";

export function logoutService() {

  const removeToken = async () => {
    const [error, _] = await tryToCatch(AsyncStorage.removeItem("@token"))
    if (error) return { error: true, detail: error};
    return { error: false, detail: "Token deleted!"};
  };

  const removeUserData = async () => {
    const [error, _] = await tryToCatch(AsyncStorage.removeItem("@userData"))
    if (error) return { error: true, detail: error};
    return { error: false, detail: "User Data deleted!"};
  };

  const removeTokenAction = removeToken();
  const removeUserDataAction = removeUserData();

  if (removeTokenAction.error) return removeTokenAction;
  if (removeUserDataAction.error) return removeUserDataAction;

  return { error: false, detail: "User logged out!" };
};