import api from "../api/axios";

export const loginUser = async (data) => {
  return await api.post("/api/auth/login", data);
};