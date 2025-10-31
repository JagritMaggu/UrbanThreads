import api from "./api";

export const addToWishlist = (productId) => 
  api.post("/api/wishlist", { productId });

export const getWishlist = () => 
  api.get("/api/getWishlist");

export const removeFromWishlist = (productId) => 
  api.delete(`/api/wishlist/${productId}`);