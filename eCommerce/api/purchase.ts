import axios from "axios";
import { CartItem } from "../types/cartItem";

interface PurchaseResponse {
  success: boolean;
  order: any;
}

export const createPurchase = async (
  userId: number,
  cartItems: CartItem[]
): Promise<PurchaseResponse> => {
  const serializedCart = cartItems.map((item) => ({
    ...item,
    image: typeof item.image === "string" ? item.image : "",
  }));

  const response = await axios.post("http://localhost:3001/purchase", {
    userId,
    cartItems: serializedCart,
  });

  return response.data;
};
