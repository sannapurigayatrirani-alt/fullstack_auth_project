import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const validateToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    await api.get("/auth/home", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;

  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return false;
  }
};

export default api;