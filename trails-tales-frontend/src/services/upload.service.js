import api from "../api/axios";

export const uploadImageService = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/journals/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
