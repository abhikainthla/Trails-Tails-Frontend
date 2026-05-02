import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  //  LOGIN
  login: (data) => {
    localStorage.setItem("token", data.token);

    set({
      user: data.user,
      token: data.token,
    });
  },

  //  REGISTER
  register: async (data) => {
    await api.post("/auth/register", data);
  },

  //  FETCH CURRENT USER (KEY PART)
fetchUser: async () => {
  try {
    const res = await api.get("/users/me");
    set({ user: res.data });
  } catch (err) {
    console.error(err);
    localStorage.removeItem("token");
    set({ user: null, token: null });
  }
},


  //  LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },


}));

export default useAuthStore;
