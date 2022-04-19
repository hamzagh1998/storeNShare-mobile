import { Auth } from "../../api/auth";

import { tryToCatch } from "../../utils/try-to-catch";

export async function registerService(username, email, password) {


  const [error, res] = await tryToCatch(Auth.register, {username, email, password});
  if (error) {
    return {error: true, detail: error};
  } else if (res.error) {
    return res;
  };

  return {error: false, detail: res.detail};
};