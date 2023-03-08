import { setToken } from "./services/axiosService";
import { AxiosError } from "axios";
import axios from "./services/axiosService";

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
