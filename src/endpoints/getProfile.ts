import { AxiosError } from "axios";
import axios from "./services/axiosService";

export const getProfile = async () => {
  const token = localStorage.getItem("auth_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get("/auth/profile");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{
      message: string;
    }>;
    if (err.response) {
      throw new Error(err.response?.data.message);
    }
  }
};
