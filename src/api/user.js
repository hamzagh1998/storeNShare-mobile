import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class User {

  static async editProfile(token, payload) {
    const [error, data] = await tryToCatch(async (token, userInfo) => (
      await axios.put("/user/edit-profile", {userInfo}, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, data);
  };

  static async changePassword(token, payload) {
    const [error, data] = await tryToCatch(async (token, password) => (
      await axios.put("/user/change-password", {password}, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, data);
  };

  static async deleteUserAccount(token) {
    const [error, data] = await tryToCatch(async token => (
      await axios.delete("/user/danger", {headers: {Authorization: "Bearer "+token}})
    ), token);
    return requestHandler(error, data);
  };

};