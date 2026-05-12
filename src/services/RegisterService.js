import api from "../api/axios";

export const registerUser = (data) => {
  return api.post("/api/auth/register", data);
};