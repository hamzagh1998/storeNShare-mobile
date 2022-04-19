import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Auth } from "../../api/auth";

import { tryToCatch } from "../../utils/try-to-catch";


export async function loginService(usernameOrEmail, password) {

  let userData = null;

  const storeToken = async value => {
    const [error, _] = await tryToCatch(AsyncStorage.setItem, "@token", value);
    if (error) return {error: true, detail: err};
  };

  const storeUserData = async value => {
    const userData = JSON.stringify(value) // convert user oject to json
    const [error, _] = await tryToCatch(AsyncStorage.setItem, "@userData", userData);
    if (error) return {error: true, detail: err};
  };

  const [error, res] = await tryToCatch(Auth.login, {usernameOrEmail, password});
  if (error) {
    return {error: true, detail: error};
  } else if (res.error) {
    return res;
  };
  // store token
  storeToken(res.detail);
  // decode jwt
  userData = jwt_decode(res.detail);
  // store user object
  storeUserData(userData);

  return {error: false, token: res.detail, userData};
};