import axios from "../services/axiosService";
import { AxiosError } from "axios";

export const createAdmin = async (data: any) => {
  try {
    const response = await axios.post("/admin/create/account", data);
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

export const getAllAdmins = async () => {
  const token = localStorage.getItem("auth_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get("/auth/all/admins");
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

export const deleteAdmin = async (id: string) => {
  const token = localStorage.getItem("auth_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.delete(`/auth/delete/admin/${id}`);
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
