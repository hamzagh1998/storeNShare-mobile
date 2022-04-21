import { Collection } from "../../api/collection";

import { tryToCatch } from "../../utils/try-to-catch";

export class CollectionService {

  static async createCollectionService(token, payload) {
    const [error, data] = await tryToCatch(Collection.createCollection, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async deleteCollectionService(token, collectionId) {
    const [error, data] = await tryToCatch(Collection.deleteCollection, token, collectionId);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

};