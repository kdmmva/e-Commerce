import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default apiClient;
