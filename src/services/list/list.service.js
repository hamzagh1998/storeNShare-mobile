import { List } from "../../api/list";

import { tryToCatch } from "../../utils/try-to-catch";

export class ListService {
  
  static async myListDetailService(token, listId, payload) {
    const [error, data] = await tryToCatch(List.myListDetail, token, listId, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async createListService(token, payload) {
    const [error, data] = await tryToCatch(List.createList, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async updateListService(token, listId, payload) {
    const [error, data] = await tryToCatch(List.updateList, token, listId, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async deleteListService(token, listId) {
    const [error, data] = await tryToCatch(List.deleteList, token, listId);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

};