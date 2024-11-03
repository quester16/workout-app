import Cookies from "js-cookie";
import { caxios } from "../api.js";
import { TOKEN } from "../app.constans.js";

class AuthService {
  async main(email, password, type) {
    try {
      const { data } = await caxios.post(`/auth/${type}`, { email, password });

      if (data.token) Cookies.set(TOKEN, data.token);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new AuthService();
