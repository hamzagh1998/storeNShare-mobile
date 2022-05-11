import { User } from "../../api/user";

import { tryToCatch } from "../../utils/try-to-catch";

export class UserService {

  static async editProfileService(token, payload) {
    const [error, data] = await tryToCatch(User.editProfile, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async changePasswordService(token, payload) {
    const [error, data] = await tryToCatch(User.changePassword, token, payload);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

  static async deleteUserAccountService(token) {
    const [error, data] = await tryToCatch(User.deleteUserAccount, token);
    if (error) return { error: true, detail: error};
    if (data.error) return { error: true, detail: data.detail};
    return { error: false, detail: data.detail};
  };

};