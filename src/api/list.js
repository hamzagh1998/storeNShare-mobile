import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class List {

  static async myListDetail(token, listId, payload) {
    const [error, res] = await tryToCatch(async (token, listId, collectionId) => (
      axios.post("/list/my/"+listId, collectionId, {headers: {Authorization: "Bearer "+token}})
    ), token, listId, payload);
    return requestHandler(error, res);
  };

  static async listDetail(token, listId) {
    const [error, res] = await tryToCatch(async (token, id) => (
      axios.get("/list/"+id, {headers: {Authorization: "Bearer "+token}})
    ), token, listId);
    return requestHandler(error, res);
  };

  static async listShare(token, id, payload) {
    const [error, res] = await tryToCatch(async (token, id, collectionId) => {
      axios.post("/list/share/"+id, {collectionId}, {headers: {Authorization: "Bearer "+token}});
    }, token, id, payload);
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