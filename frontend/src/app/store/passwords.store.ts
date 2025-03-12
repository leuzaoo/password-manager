import axios, { type AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

axios.defaults.withCredentials = true;

const PASSWORD_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1/passwords"
    : "/api/v1/passwords";

export interface Password {
  id: string;
  platform: string;
  login: string;
  password: string;
}

interface PassState {
  passwords: Password[];
  isLoading: boolean;
  error: string | null;
  message: string | null;
  addPassword: (
    platform: string,
    login: string,
    password: string,
  ) => Promise<void>;
  getPassword: () => Promise<void>;
}

export const usePassStore = create<PassState>((set) => ({
  passwords: [],
  isLoading: false,
  error: null,
  message: null,

  addPassword: async (platform, login, password) => {
    set({ isLoading: true });

    try {
      const response: AxiosResponse<{ password: Password; message: string }> =
        await axios.post(`${PASSWORD_API_URL}/add-password`, {
          platform,
          login,
          password,
        });

      set((state) => ({
        passwords: [...state.passwords, response.data.password],
        isLoading: false,
        error: null,
      }));

      toast.success(response.data.message || "Senha salva com sucesso!");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Erro ao salvar a senha";

      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  getPassword: async () => {
    set({ isLoading: true, error: null });

    try {
      const response: AxiosResponse<Password[]> = await axios.get(
        `${PASSWORD_API_URL}/get-password`,
      );
      set({ passwords: response.data, isLoading: false });
    } catch (error) {
      console.error("Erro ao buscar senhas: ", error);
      set({
        error:
          error.response?.data?.message ||
          "Erro desconhecido ao buscar as senhas.",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
