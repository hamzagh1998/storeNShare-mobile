import { List } from "../../api/list";

import { tryToCatch } from "../../utils/try-to-catch";

export class ListService {
  
  static async createListService(token, payload) {
    const [error, data] = await tryToCatch(List.createList, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

};