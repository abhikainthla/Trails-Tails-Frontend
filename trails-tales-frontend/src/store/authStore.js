import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  user: null,

  token: localStorage.getItem("token") || null,

  isLoading: false,

  // ==========================================
  // LOGIN
  // ==========================================

  login: (data, remember = true) => {
    const { user, token } = data;

    if (remember) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    set({
      user,
      token,
    });
  },

  // ==========================================
  // REGISTER
  // ==========================================

  register: (data) => {
    const { user, token } = data;

    localStorage.setItem("token", token);

    set({
      user,
      token,
    });
  },

  // ==========================================
  // FETCH CURRENT USER
  // ==========================================

  fetchUser: async () => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      set({
        user: null,
        token: null,
      });

      return;
    }

    try {
      set({
        isLoading: true,
      });

      const res = await api.get("/users/me");

      set({
        user: res.data,
        token,
      });
    } catch (err) {
      console.error(
        "FETCH USER ERROR:",
        err.response?.data || err.message
      );

      // ONLY remove token when authentication
      // is actually invalid.
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        set({
          user: null,
          token: null,
        });
      }
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  // ==========================================
  // LOGOUT
  // ==========================================

  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;