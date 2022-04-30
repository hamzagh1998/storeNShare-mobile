import { Item } from "../../api/item";

import { tryToCatch } from "../../utils/try-to-catch";

export class ItemService {
  
  static async createItemService(token, payload) {
    const [error, data] = await tryToCatch(Item.createItem, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async updateItemService(token, itemId, payload) {
    const [error, data] = await tryToCatch(Item.updateItem, token, itemId, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async deleteItemService(token, itemId) {
    const [error, data] = await tryToCatch(Item.deleteItem, token, itemId);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

};