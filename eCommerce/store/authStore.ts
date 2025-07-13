import { router } from "expo-router";
import { create } from "zustand";
import {
  handleLogin,
  handleLogout,
  handleRegister,
  restoreSession,
} from "../services/authService";
import { User } from "../types/user";
import { validateEmail, validatePassword } from "../utils/validation";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => void;
  register: (
    firstName: string,
    lastName: string,
    nickname: string,
    email: string,
    password: string
  ) => void;
  logout: () => void;
  restoreAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!validatePassword(password)) {
      throw new Error("Password must be at least 8 characters, include 1 number and 1 uppercase letter");
    }

    try {
      const { token, user } = await handleLogin(email, password);
      console.log("✅ Logged in user:", user);
      set({ token, user, isAuthenticated: true });
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  },

  register: async (firstname, lastname, nickname, email, password) => {
    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!validatePassword(password)) {
      throw new Error("Password must be at least 8 characters, include 1 number and 1 uppercase letter");
    }

    try {
      const { token, user } = await handleRegister(
        firstname,
        lastname,
        nickname,
        email,
        password
      );
      set({ token, user, isAuthenticated: true });
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  },

  logout: async () => {
    console.log("🚪 Logout");
    await handleLogout();
    set({ token: null, user: null, isAuthenticated: false });
    router.replace("/(auth)/login");
  },

  restoreAuth: async () => {
    const session = await restoreSession();
    if (session) {
      console.log(`🔄 Restoring session for ${session.user.email}`);
      set({ token: session.token, user: session.user, isAuthenticated: true });
    } else {
      console.log("🛑 No saved session found");
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
