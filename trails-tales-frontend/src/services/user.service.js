import api from "../api/axios";

export const getProfileService = () => {
  return api.get("/users/me");
};

export const getUserByIdService = (id) => {
  return api.get(`/users/${id}`);
};

export const updateProfileService = (data) => {
  return api.put("/users/me", data);
};

export const followUserService = (id) => {
  return api.post(`/users/${id}/follow`);
};

export const getTravelersService = () => {
  return api.get("/users");
};
