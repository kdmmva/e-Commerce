import { User } from "../types/user";
import apiClient from "./apiClient";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nickname: string;
    firstname: string;
    lastname: string;
  };
}

interface RegisterResponse {
  token: string;
  user: User;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Invalid credentials");
  }
};

export const registerUser = async (
  firstname: string,
  lastname: string,
  nickname: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post("/register", {
      firstname,
      lastname,
      nickname,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};
