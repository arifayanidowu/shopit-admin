import { AxiosError } from "axios";
import axios from "./services/axiosService";

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
