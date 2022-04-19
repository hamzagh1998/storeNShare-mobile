import axios from "axios";

import { tryToCatch } from "../utils/try-to-catch";
import { requestHandler } from "../utils/request-handler";

export class Auth {

  static async login(payload) {
    const [error, res] = await tryToCatch(async body => axios.post("/auth/login", body), payload);
    return requestHandler(error, res);
  };

  static async register(payload) {
    const [error, res] = await tryToCatch(async body => axios.post("/auth/register", body), payload);
    return requestHandler(error, res);
  };
};