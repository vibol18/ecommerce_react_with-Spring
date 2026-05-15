import api from "../api/axios";

export const getCart = async () => {
  return await api.get("/api/cart");
};

export const addToCart = async (cartData) => {
  return await api.post("/api/cart", cartData);
};

export const deleteCart = async (id) => {
  return await api.delete(`/api/cart/${id}`);
};