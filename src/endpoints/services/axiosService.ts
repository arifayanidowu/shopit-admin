import axios from "axios";
import { NavigateFunction } from "react-router-dom";

axios.defaults.baseURL = process.env.BASE_URL || "http://localhost:3000";
export const token = localStorage.getItem("auth_token");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const logout = (navigate: NavigateFunction, resetState: () => void) => {
  localStorage.removeItem("auth_token");
  navigate("/");
  resetState();
};

export const setToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

export default axios;
