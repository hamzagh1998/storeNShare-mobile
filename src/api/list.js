import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class List {

  static async createList(token, payload) {
    const [error, res] = await tryToCatch(async (token, listInfo) => (
      axios.post("/list/create", listInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, res);
  };

};