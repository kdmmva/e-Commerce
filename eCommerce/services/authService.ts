import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/authApi";
import { User } from "../types/user";

export const handleLogin = async (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  const { token, user } = await loginUser(email, password);

  const fullUser: User = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    firstname: user.firstname,
    lastname: user.lastname,
  };

  await AsyncStorage.setItem("authToken", token);
  await AsyncStorage.setItem("authUser", JSON.stringify(fullUser));
  return { token, user: fullUser };
};

export const handleRegister = async (
  firstname: string,
  lastname: string,
  nickname: string,
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  const { token, user } = await registerUser(
    firstname,
    lastname,
    nickname,
    email,
    password
  );
  await AsyncStorage.setItem("authToken", token);
  await AsyncStorage.setItem("authUser", JSON.stringify(user));
  return { token, user };
};

export const handleLogout = async (): Promise<void> => {
  await AsyncStorage.removeItem("authToken");
  await AsyncStorage.removeItem("authUser");
};

export const restoreSession = async (): Promise<{
  token: string;
  user: User;
} | null> => {
  const token = await AsyncStorage.getItem("authToken");
  const userStr = await AsyncStorage.getItem("authUser");

  if (token && userStr) {
    const user: User = JSON.parse(userStr);
    return { token, user };
  }

  return null;
};
