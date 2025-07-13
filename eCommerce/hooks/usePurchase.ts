import { useNavigation } from "@react-navigation/native";
import { createPurchase } from "../api/purchase";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";

export const usePurchase = () => {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const { cart, clearCart } = useCartStore();

  const handlePay = async () => {
    if (!user?.id) {
      console.error("❌ Not found");
      return;
    }
  
    try {
      const data = await createPurchase(Number(user.id), cart);
      console.log("✅ The order has been saved successfully:", data.order);
  
      clearCart();         
      navigation.goBack(); 
    } catch (error) {
      console.error("❌ Error when purchasing:", error);
    }
  };  

  return handlePay;
};
