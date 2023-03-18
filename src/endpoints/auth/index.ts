import { AxiosError } from "axios";
import axios, { setToken } from "../services/axiosService";

export const authLogin = async (email: string) => {
  try {
    const response = await axios.post("/auth/login", { destination: email });
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

export const getProfile = async () => {
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

export const getAdminCounts = async () => {
  try {
    const response = await axios.get("/auth/admin/counts");
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

export const getMagicToken = async (token: string) => {
  try {
    const response = await axios.get("/auth/login/callback?token=" + token);
    setToken(response.data.access_token);
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
