import { AxiosError } from "axios";
import axios from "../services/axiosService";

export const getCategories = async () => {
  try {
    const response = await axios.get("/category");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      message: string;
    }>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data?.message);
    }
    return error;
  }
};

export const createCategory = async (data: any): Promise<any> => {
  try {
    const response = await axios.post("/category/create", data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      message: string;
    }>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data?.message);
    }
    return error;
  }
};
