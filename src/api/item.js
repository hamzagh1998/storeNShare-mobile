import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class Item {

  static async createItem(token, payload) {
    const [error, res] = await tryToCatch(async (token, ItemInfo) => (
      axios.post("/item/create", ItemInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, res);
  };

  static async updateItem(token, itemId, payload) {
    const [error, res] = await tryToCatch(async (token, id, ItemInfo) => (
      axios.put("/item/update/"+id, ItemInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, itemId, payload);
    return requestHandler(error, res);
  };

  static async deleteItem(token, itemId) {
    const [error, res] = await tryToCatch(async (token, itemId) => (
      axios.delete("/item/delete/"+itemId, {headers: {Authorization: "Bearer "+token}})
    ), token, itemId);
    return requestHandler(error, res);
  };

};