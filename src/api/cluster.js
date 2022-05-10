import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class Cluster {

  static async myCluster(token) {
    const [error, res] = await tryToCatch(async token => (
      axios.get("/cluster/my", {headers: {Authorization: "Bearer "+token}})
      ), token);
      return requestHandler(error, res);
  };

  static async clusterDetail(token, clusterId) {
    const [error, res] = await tryToCatch(async (token, id) => (
      axios.get("/cluster/"+id, {headers: {Authorization: "Bearer "+token}})
      ), token, clusterId);
      return requestHandler(error, res);
  };

  static async allClusters(token) {
    const [error, res] = await tryToCatch(async token => (
      axios.get("/cluster/all/", {headers: {Authorization: "Bearer "+token}})
      ), token);
      return requestHandler(error, res);
  };

  static async createCluster(token, payload) {
    const [error, res] = await tryToCatch(async (token, clusterInfo) => (
      axios.post("/cluster/create", clusterInfo, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, res);
  };

  static async updateCluster(token, payload) {
    const [error, res] = await tryToCatch(async (token, clusterInfo) => (
      axios.put("/cluster/update", {clusterInfo}, {headers: {Authorization: "Bearer "+token}})
    ), token, payload);
    return requestHandler(error, res);
  };

  static async deleteCluster(token) {
    const [error, res] = await tryToCatch(async token => (
      axios.delete("/cluster/delete", {headers: {Authorization: "Bearer "+token}})
      ), token);
      return requestHandler(error, res);
  };
  
};