import api from "./api";

export const addToCart = async (productId) => {
  return await api.post("/api/cart", { productId, quantity: 1 });
};

export const updateCartQty = async (productId, quantity) => {
  return await api.patch(`/api/cart`, { productId, quantity });
};

export const removeFromCart = async (productId) => {
  return await api.delete(`/api/cart/${productId}`);
};

export const getCart = async () => {
  return await api.get("/api/getcart"); 
};
