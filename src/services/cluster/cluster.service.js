import { Cluster } from "../../api/cluster";

import { tryToCatch } from "../../utils/try-to-catch";

export class ClusterServie {

  static async myClusterService(token) {
    const [error, data] = await tryToCatch(Cluster.myCluster, token);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async createClusterService(token, payload) {
    const [error, data] = await tryToCatch(Cluster.createCluster, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  }
};