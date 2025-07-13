import apiClient from "./apiClient";

export const getUserOrders = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data.orders || []; 
};
