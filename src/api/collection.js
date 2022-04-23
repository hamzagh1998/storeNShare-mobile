import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class Collection {

  static async myCollectionDetail(token, collectionId) {
    const [error, res] = await tryToCatch(async (token, id) => (
      axios.get("collection/my/"+id, {headers: {Authorization: "Bearer "+token}})
    ), token, collectionId);
    return requestHandler(error, res);
  };

  static async createCollection(token, payload) {
    const [error, res] = await tryToCatch(async (token, collectionInfo) => (
      axios.post("/collection/create", collectionInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, res);
  };
  
  static async updateCollection(token, collectionId, payload) {
    const [error, res] = await tryToCatch(async (token, id, collectionInfo) => (
      axios.put("/collection/update/"+id, collectionInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, collectionId, payload);
    return requestHandler(error, res);
  };

  static async deleteCollection(token, collectionId) {
    const [error, res] = await tryToCatch(async (token, collectionId) => (
      axios.delete("/collection/delete/"+collectionId, {headers: {Authorization: "Bearer "+token}})
    ), token, collectionId);
    return requestHandler(error, res);
  };

};