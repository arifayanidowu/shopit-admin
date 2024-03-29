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

export const updateAdmin = async (admin: any) => {
  try {
    const response = await axios.patch(`/auth/update/admin`, admin);
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

export const deleteAdmins = async (ids: string[]) => {
  try {
    const response = await axios.delete(`/auth/delete/admins`, {
      data: {
        ids,
      },
    });
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

export const updateProfile = async (data: any) => {
  try {
    const response = await axios.patch(`/auth/update/admin/profile`, data);
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
