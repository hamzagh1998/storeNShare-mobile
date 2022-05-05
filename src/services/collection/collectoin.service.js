import { Collection } from "../../api/collection";

import { tryToCatch } from "../../utils/try-to-catch";

export class CollectionService {

  static async myCollectionDetailService(token, collectionId) {
    const [error, data] = await tryToCatch(Collection.myCollectionDetail, token, collectionId);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async collectionDetailService(token, collectionId) {
    const [error, data] = await tryToCatch(Collection.collectionDetail, token, collectionId);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  }

  static async createCollectionService(token, payload) {
    const [error, data] = await tryToCatch(Collection.createCollection, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async shareCollectionService(token, collectionId) {
    const [error, data] = await tryToCatch(Collection.shareCollection, token, collectionId);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };
  
  static async updateCollectionService(token, collectionId, payload) {
    const [error, data] = await tryToCatch(Collection.updateCollection, token, collectionId, payload);
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