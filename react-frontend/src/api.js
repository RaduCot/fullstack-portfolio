import axios from "axios";

export const API_URL = "http://192.168.1.133:3000";

// Fetch all works
export const fetchWorks = async () => {
  const response = await axios.get(`${API_URL}/works`);
  return response.data;
};

// Toggle work status by ID
export const toggleWorkStatus = async (id, newStatus) => {
  const response = await axios.patch(`${API_URL}/works/${id}`, {
    status: newStatus,
  });
  return response.data;
};

// Delete work by ID
export const deleteWork = async (id) => {
  const response = await axios.delete(`${API_URL}/works/${id}`);
  return response.data;
};

// Add new work
export const createWork = async (workData) => {
  const response = await axios.post(`${API_URL}/works`, workData);
  return response.data;
};

// Edit existing work by ID
export const editWork = async (id, updatedData) => {
  const response = await axios.patch(`${API_URL}/works/${id}`, updatedData);
  return response.data;
};

// Upload image and return the full image path
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post(`${API_URL}/works/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (response.data.success) {
    // Construct the full URL for the image
    const imagePath = `${response.data.imagePath}`;
    return imagePath;
  } else {
    throw new Error("Image upload failed");
  }
};
