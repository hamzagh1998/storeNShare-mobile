import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class List {

  static async myListDetail(token, listId, payload) {
    const [error, res] = await tryToCatch(async (token, listId, collectionId) => (
      axios.get("/list/my/"+listId, collectionId, {headers: {Authorization: "Bearer "+token}})
    ), token, listId, payload);
    return requestHandler(error, res);
  };

  static async createList(token, payload) {
    const [error, res] = await tryToCatch(async (token, listInfo) => (
      axios.post("/list/create", listInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, res);
  };

  static async updateList(token, listId, payload) {
    const [error, res] = await tryToCatch(async (token, id, listInfo) => (
      axios.put("/list/update/"+id, listInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, listId, payload);
    return requestHandler(error, res);
  };

  static async deleteList(token, listId) {
    const [error, res] = await tryToCatch(async (token, listId) => (
      axios.delete("/list/delete/"+listId, {headers: {Authorization: "Bearer "+token}})
    ), token, listId);
    return requestHandler(error, res);
  };

};