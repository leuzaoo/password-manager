import axios, { type AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const AUTH_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1/auth"
    : "/api/v1/auth";

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export interface User {
  email: string;
  password: string;
  id?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  message: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUserFromStorage: () => void;
}

const loadUserFromStorage = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const userJSON = localStorage.getItem("auth_user");
    if (!userJSON) return null;

    return JSON.parse(userJSON);
  } catch (error) {
    console.error("Error after trying to load user from localStorage:", error);
    return null;
  }
};

const initialUser =
  typeof window !== "undefined" ? loadUserFromStorage() : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: null,
  message: null,

  loadUserFromStorage: () => {
    const user = loadUserFromStorage();
    set({ user, isAuthenticated: !!user });
  },

  login: async (email, password) => {
    set({ isLoading: false });

    try {
      const response: AxiosResponse<{ user: User; message: string }> =
        await axios.post(`${AUTH_API_URL}/login`, {
          email,
          password,
        });

      localStorage.setItem("auth_user", JSON.stringify(response.data.user));

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: true,
        error: null,
      });

      toast.success(response.data.message || "Login realizado.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const response = axiosError.response;

      if (response) {
        const errorMessage = response.data?.message || "Erro ao fazer login";
        toast.error(errorMessage);
        set({ error: errorMessage, isLoading: false });
      } else {
        toast.error("Erro de conexão");
        set({ error: "Erro de conexão", isLoading: false });
      }
    }
  },

  signup: async (email, password) => {
    set({ isLoading: false });

    try {
      const response: AxiosResponse<{ user: User; message: string }> =
        await axios.post(`${AUTH_API_URL}/signup`, {
          email,
          password,
        });

      localStorage.setItem("auth_user", JSON.stringify(response.data.user));

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: true,
        error: null,
        message: response.data.message || "Conta criada com sucesso.",
      });

      toast.success(response.data.message || "Conta criada.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const response = axiosError.response;

      let errorMessage = "Erro ao criar a conta.";

      if (response) {
        errorMessage = response.data?.message || errorMessage;
      } else {
        errorMessage = "Erro de conexão. Verifique sua internet";
      }

      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await axios.post(`${AUTH_API_URL}/logout`);
    } catch (error) {
      console.error("Erro ao fazer logout no servidor:", error);
    } finally {
      localStorage.removeItem("auth_user");

      deleteCookie("password-manager");

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      toast.success("Logout relizado com sucesso!");
    }
  },
}));
