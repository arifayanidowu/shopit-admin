import { AxiosError } from "axios";
import axios from "../services/axiosService";

export const createBrand = async (data: any) => {
  try {
    const response = await axios.post("/brand/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const updateBrand = async (data: any) => {
  try {
    const response = await axios.patch(`/brand/${data.get("id")}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const getAllBrands = async () => {
  try {
    const response = await axios.get("/brand");
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

export const deleteBrand = async (id: string) => {
  try {
    const response = await axios.delete(`/brand/${id}`);
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
