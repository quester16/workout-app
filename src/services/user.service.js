import { caxios } from "../api.js";

class UserService {
  getProfile() {
    return caxios.get(`/user/profile`);
  }
}

export default new UserService();
