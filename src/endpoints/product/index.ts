import { AxiosError } from "axios";
import Axios from "../services/axiosService";

export const createProduct = async (data: any) => {
  try {
    const response = await Axios.post("/product/create", data, {
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

export const updateProduct = async (data: any) => {
  try {
    const response = await Axios.patch(`/product/${data.get("id")}`, data, {
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
    throw new Error(err.message);
  }
};

export const getProducts = async () => {
  try {
    const response = await Axios.get("/product");
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

export const deleteProduct = async (id: string) => {
  try {
    const response = await Axios.delete(`/product/${id}`);
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
