import api, { USE_MOCK } from "./api";
import { MOCK_USERS } from "../data/mockData";

const authService = {
  async getUserById(id) {
    if (USE_MOCK) {
      const u = MOCK_USERS.find((u) => u.id === id);
      if (!u) throw new Error("User not found");
      const { password, ...safe } = u;
      return safe;
    }
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
};

export default authService;