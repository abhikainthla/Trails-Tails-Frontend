import api from "../api/axios";

export const registerService = (data) => {
  return api.post("/auth/register", data);
};

export const loginService = (data) => {
  return api.post("/auth/login", data);
};
