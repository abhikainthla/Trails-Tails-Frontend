import api from "../api/axios";

//  CRUD
export const createJournalService = async (data) => {
  return api.post("/journals", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getJournalsService = () => {
  return api.get("/journals");
};

export const getJournalByIdService = (id) => {
  return api.get(`/journals/${id}`);
};

export const updateJournalService = (id, data) => {
  return api.put(`/journals/${id}`, data);
};

export const deleteJournalService = (id) => {
  return api.delete(`/journals/${id}`);
};

//  Social
export const likeJournalService = (id) => {
  return api.post(`/journals/${id}/like`);
};

export const commentJournalService = (id, text) => {
  return api.post(`/journals/${id}/comment`, { text });
};

//  Geo
export const getNearbyJournalsService = (lng, lat) => {
  return api.get(`/journals/nearby?lng=${lng}&lat=${lat}`);
};

//  Search
export const searchJournalsService = (query, tag) => {
  return api.get(`/journals/search?q=${query}&tag=${tag}`);
};

//  Views
export const incrementViewService = (id) => {
  return api.patch(`/journals/${id}/view`);
};
